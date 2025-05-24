import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <>
    <Navbar/>
    <div className="flex ">
    <Sidebar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    </>
  );
}
