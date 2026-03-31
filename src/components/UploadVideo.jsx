import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { use, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { formatTimeAgo } from "../util/formatTime";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function UploadVideo({ video, channelId }) {
  const user = useSelector((state) => state.auth.user);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();
  const videoId = video._id;

  

const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleOnClickVideo = async () => {
    try {
      if (isLoggedIn) {
        await axios.post(`/api/v1/videos/watch-video/${video._id}`);
        navigate(`/video/${video._id}`);
      } else {
        toast.success("You have to Login first");
        navigate("/login");
      }
    } catch (error) {
      console.log("Failed to watch video", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={handleOnClickVideo}
      className="w-full bg-[#0f0f0f] text-white rounded-xl overflow-hidden cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-150"
    >
      {/* Thumbnail — 16:9 */}
      <div className="w-full aspect-video overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover"
          src={video.thumbnail}
          alt={video.title}
        />
      </div>

      {/* Info row */}
      <div className="flex items-start justify-between gap-2 pt-3 pb-4 px-1">
        {/* Title + meta */}
        <div className="flex flex-col gap-1 overflow-hidden flex-1">
          <p className="text-sm font-semibold leading-[1.3] line-clamp-2 text-white">
            {video.title.length > 25
              ? video.title.slice(0, 25) + "..."
              : video.title}
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-xs mt-0.5">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{formatTimeAgo(video.createdAt)}</span>
          </div>
        </div>

        {/* Dropdown trigger + menu */}
        <div
          className="flex flex-col items-end flex-shrink-0 relative"
          ref={dropdownRef}
        >
          {user?.user?.channel === channelId && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setDropdown(true);
              }}
              className="p-1 rounded-md hover:bg-[#2a2a2a] transition-colors"
            >
              <FontAwesomeIcon
                className="cursor-pointer text-gray-400 text-sm"
                icon={faCaretDown}
              />
            </div>
          )}
          {dropdown && (
            <Link
              to={`/edit-video/${videoId}/${channelId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-7 right-0 bg-[#272727] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg cursor-pointer hover:bg-[#3a3a3a] transition-colors z-10">
                Edit
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
