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

export default function App() {



  return (
    <>
    <Navbar/>
    <div className="flex  ">
    <Sidebar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<ProfilePage/>}/>
        <Route path="/create-channel-page" element={<CreateChannel/>}/>
        <Route path="/channel/:channelId" element={<Channel/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/history" element={<WatchHistoryPage/>}/>
      </Routes>
    </div>
    </>
  );
}
