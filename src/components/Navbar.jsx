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

import SearchDropownList from "./SearchDropownList";
import { useSearchVideosQuery } from "../api/videoApi";
export default function Navbar() {
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading } = useSearchVideosQuery(query, {
    skip: !query.trim(),
  });

  const handleOnQuery = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestion(!!value.trim()); //only show suggestion when there is something written in search inpu
  };

  const results = data?.data;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${query}`);
    }
    setSuggestion(false)
  };

  const handleOnClick = () => {
    navigate(`/search?q=${query}`);
    setSuggestion(false);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const goToCreateChannel = () => {
    navigate("/create-channel-page");
  };
  const goToPostVideo = () => {
    navigate("/post-video");
  };
  const goTohomePage = () => {
    navigate("/");
  };
  if (isLoading) return <p>loading</p>;
  return (
    <>
      <nav className="sticky top-0  shadow z-50 bg-transparent backdrop-blur-2xl p-[1rem] w-full flex items-center  text-2xl text-black justify-between border-b-[1px] border-gray-500">
        <div
          onClick={goTohomePage}
          className="flex items-center cursor-pointer gap-[10px]"
        >
          <img
            className="w-[3rem]"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
          />
          <p className="font-bold">YouTube</p>
        </div>

        <div className="hidden lg:flex w-[30rem] rounded-2xl  items-center border-[1px] h-[2.5rem] px-[1rem] ">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            className="focus:outline-none rounded-2xl px-[1rem] text-[1rem]  w-[28rem]"
            value={query}
            onChange={handleOnQuery}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
        {suggestion && results.length > 0 && (
          <div className="absolute top-[4.5rem] bg-gray-700 w-[30rem] left-[24rem] rounded-2xl h-[25rem] p-[1rem] overflow-y-auto  ">
            {results.map((result) => (
              <SearchDropownList
                result={result}
                key={result._id}
                onClick={handleOnClick}
              />
            ))}
          </div>
        )}
        <div className="flex justify-between items-center w-[15rem]">
          {user?.channel ? (
            <div
              onClick={goToPostVideo}
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
