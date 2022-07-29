import HomeFeed from "./Components/HomeFeed";
import Notifications from './Components/Notifications'
import Bookmarks from './Components/Bookmarks'
import ProfileDetails from './Components/ProfileDetails'
import TweetDetails from './Components/TweetDetails'
import ErrorPage from "./Components/ErrorPage";
import Profile from './Components/Profile'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Sidebar";
import GlobalStyle from './Components/GlobalStyle';


function App() {
  return (
    <>
    
      <BrowserRouter>
      <div><Header /></div>
        <Routes>
          <Route exact path="/" element={<HomeFeed/>} />
          <Route  path="/profile" element={<Profile/>} />
          <Route  path="/notifications" element={<Notifications/>} />
          <Route  path="/bookmarks" element={<Bookmarks/>} />
          <Route  path="/tweet/:tweetId" element={<TweetDetails/>} />
          <Route  path="/:tweetHandle" element={<ProfileDetails/>} />
          <Route path="/errorpage" element={< ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;

