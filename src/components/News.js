import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [artikls, setArtikls] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page +1}&pageSize=${props.pageSize}&category=${props.category}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArtikls(artikls.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  }

  const updateNews = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json()
    props.setProgress(50)
    setArtikls(parsedData.articles)
    settotalResults(parsedData.totalResults)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`;
      updateNews(); 
  }, []);

  return (
    <>
      <h1 className="text-center" style={{marginTop :'90px' }}>NewsCards-Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      <InfiniteScroll
        dataLength={artikls.length}
        next={fetchMoreData}
        hasMore={artikls.length !== totalResults}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {artikls.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} discription={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
News.defaultProps = {
  pageSize: 5,
  country: 'in',
  category: 'general'
}
export default News;
