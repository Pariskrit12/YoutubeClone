import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faClockRotateLeft,
  faThumbsUp,
  faBell,
  faFire,
  faBolt,
  faDashboard,
  faVideo,
  faComment,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={` flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all ${
      active ? "bg-gray-700 text-white" : "hover:bg-gray-300"
    }`}
  >
    <FontAwesomeIcon icon={icon} className="text-lg mb-1" />
    <span className="text-xs font-medium">{label}</span>
  </div>
);

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  let navItems = [];
  if (isAdmin) {
    navItems = [
      { icon: faDashboard, label: "Dashboard", path: "/admin-dashboard" },
     
    ];
  } else {
    navItems = [
      { icon: faHouse, label: "Home", path: "/" },
      { icon: faClockRotateLeft, label: "History", path: "/history" },
      { icon: faThumbsUp, label: "Liked", path: "/liked" },
      { icon: faBell, label: "Subs", path: "/subscription" },
      { icon: faBolt, label: "Popular", path: "/popular" },
      { icon: faFire, label: "Trending", path: "/trending" },
    ];
  }

  return (
    <div className="hidden lg:flex bg-white sticky text-black w-24 h-screen flex-col items-center pt-4 space-y-4">
      {navItems.map((item) => (
        <SidebarItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        />
      ))}
    </div>
  );
}
