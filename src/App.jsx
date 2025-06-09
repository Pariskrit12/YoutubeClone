import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./page/Login";
import ProfilePage from "./page/ProfilePage";

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
      </Routes>
    </div>
    </>
  );
}
