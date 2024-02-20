import './App.css';
import React,{useState} from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router,Routes, Route,} from "react-router-dom";

 const App =()=>{
  const apiKey = process.env.REACT_APP_NEWS_KEY
  const [progress, setProgress] = useState(0);
    return (
      <Router>
        <NavBar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
        {/* key isliye di hai taaki components remount ho varna react sochega component to mounted hai to change kyu kru lekin different key deke problem solve ho jayegi  */}
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={5} category='general'/>}>
          </Route>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={5} category="business"/>}>
          </Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={5} category="entertainment"/>}>
          </Route>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={5} category="general"/>}>
          </Route>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={5} category="health"/>}>
          </Route>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={5} category="science"/>}>
          </Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={5} category="sports"/>}>
          </Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={5} category="technology"/>}>
          </Route>
        </Routes>
      </Router>
    );
}
export default App

