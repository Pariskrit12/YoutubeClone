import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./page/Login";
import ProfilePage from "./page/ProfilePage";
import CreateChannel from "./page/CreateChannel";
import Channel from "./page/Channel";
import Register from "./page/Register";
import WatchHistoryPage from "./page/WatchHistoryPage";
import TrendingPage from "./page/TrendingPage";
import LikedPage from "./page/LikedPage";
import PopularPage from "./page/PopularPage";
import SubscriptionPage from "./page/SubscriptionPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostVideo from "./page/PostVideo";
import SearchResultPage from "./page/SearchResultPage";
export default function App() {
  return (
    <>
      <Navbar />
      <div className="flex  ">
        <Sidebar />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/create-channel-page" element={<CreateChannel />} />
            <Route path="/channel/:channelId" element={<Channel />} />
            <Route path="/register" element={<Register />} />
            <Route path="/history" element={<WatchHistoryPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/liked" element={<LikedPage />} />
            <Route path="/popular" element={<PopularPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/post-video" element={<PostVideo />} />
            <Route path="/search" element={<SearchResultPage/>}/>
          </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
