import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faClockRotateLeft, faThumbsUp, faVideo, faBell, faGear, faFire } from '@fortawesome/free-solid-svg-icons';

const SidebarItem = ({ icon, label, active = false }) => (
  <div
    className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-gray-700 text-white' : 'hover:bg-gray-300'
    }`}
  >
    <FontAwesomeIcon icon={icon} className="text-lg mb-1" />
    <span className="text-xs font-medium">{label}</span>
  </div>
);

export default function Sidebar() {
  return (
    <div className="hidden lg:flex bg-white text-black w-24 h-screen  flex-col items-center pt-4 space-y-4">
      <SidebarItem icon={faHouse} label="Home" active />
      <SidebarItem icon={faClockRotateLeft} label="History" />
      <SidebarItem icon={faThumbsUp} label="Liked" />
      <SidebarItem icon={faVideo} label="Videos" />
      <SidebarItem icon={faBell} label="Subs" />
      <SidebarItem icon={faGear} label="Settings" />
      <SidebarItem icon={faFire} label="Popular" />
       <SidebarItem icon={faFire} label="Trending" />
    </div>
  );
}
