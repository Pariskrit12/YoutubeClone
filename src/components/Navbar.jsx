import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleUser,
  faBell,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const goToCreateChannel = () => {
    navigate("/create-channel-page");
  };
  return (
    <>
      <nav className="sticky top-0  shadow z-50 bg-transparent backdrop-blur-2xl p-[1rem] w-full flex items-center  text-2xl text-black justify-between border-b-[1px] border-gray-500">
        <div className="flex items-center">
          <img
            className="w-[3rem]"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
          />
          <p className="font-bold">YouTube</p>
        </div>
        <div className="hidden lg:flex w-[30rem] rounded-3xl  items-center border-[1px] h-[3rem] px-[1rem] ">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input className="focus:outline-none rounded-3xl px-[1rem] text- w-[28rem]"></input>
        </div>
        <div className="flex justify-between items-center w-[15rem]">
          {user?.channel ? (
            <div
              onClick={goToCreateChannel}
              className="flex cursor-pointer items-center bg-gray-700 text-white h-[3rem] w-[8rem] justify-evenly rounded-2xl font-bold text-2xl"
            >
              <p>Post</p>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          ) : (
            <div
              onClick={goToCreateChannel}
              className="flex cursor-pointer items-center bg-gray-700 text-white h-[3rem] w-[8rem] justify-evenly rounded-2xl font-bold text-2xl"
            >
              <p>Create</p>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          )}
          <FontAwesomeIcon icon={faBell} />
          <button onClick={toggleDropdown} className="cursor-pointer relative">
            {user ? (
              <img
                className="w-10 h-10 rounded-full"
                src={user?.avatar}
                alt="User avatar"
              ></img>
            ) : (
              <FontAwesomeIcon icon={faCircleUser} />
            )}
          </button>
          {dropdownOpen && (
            <Dropdown closeDropdown={() => setDropdownOpen(false)} />
          )}
        </div>
      </nav>
    </>
  );
}
