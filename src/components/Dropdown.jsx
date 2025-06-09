import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket,faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Dropdown({ closeDropdown }) {
  const navigate = useNavigate();
  const { user, logout } =useAuth();

  const handleOnLogoutClick=async ()=>{
    closeDropdown();
    await logout();
    navigate("/");
  }
  const handleOnLoginClick = () => {
    closeDropdown();
    navigate("/login");
  };

  const goToProfile=()=>{
    navigate(`/profile/${user._id}`);
    closeDropdown();
  }

  return (
    <div className="absolute top-[4.5rem] right-[1rem] w-[13rem] border-[1px] bg-gray-700 rounded-2xl text-white px-[1.5rem] py-[0.4rem] text-[17px]  ">
      {user ? (
        <div className="">
          <div className="flex items-center justify-between cursor-pointer border-b-[1px] border-gray-400 py-[5px] " onClick={goToProfile}>View Profile
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="flex items-center justify-between cursor-pointer border-b-[1px] border-gray-400 py-[5px]">Settings
            <FontAwesomeIcon icon={faGear} />
          </div>
        <div
          className="flex items-center justify-between cursor-pointer py-[5px]"
          onClick={handleOnLogoutClick}
        >
          Logout
          <FontAwesomeIcon icon={faRightToBracket} />
        </div>
        </div>
      ) : (
        
        <div
          className="flex items-center justify-between"
          onClick={handleOnLoginClick}
        >
          Login
          <FontAwesomeIcon icon={faRightToBracket} />
        </div>
        
      )}
    </div>
  );
}
