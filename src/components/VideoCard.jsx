import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatTimeAgo } from "../util/formatTime";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleOnClickVideo = async () => {
    try {
      if (isLoggedIn) {
        await axios.post(`/api/v1/videos/watch-video/${video._id}`);
        navigate(`/video/${video._id}`);
      } else {
        toast.info("You have to login first");
        navigate("/login");
      }
    } catch (error) {
      console.log("Failed to watch video", error);
    }
  };

  return (
    <div
      className="w-full bg-[#0f0f0f] text-white rounded-xl overflow-hidden cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-150"
      onClick={handleOnClickVideo}
    >
   
      <div className="w-full aspect-video overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover"
          src={video?.thumbnail}
          alt={video?.title}
        />
      </div>

    
      <div className="flex gap-3 pt-3 pb-4 px-1">
       
        <div className="flex-shrink-0 pt-0.5">
          <img
            className="w-9 h-9 rounded-full object-cover"
            src={video?.channel?.avatar}
            alt={video?.channel?.channelName}
          />
        </div>

       
        <div className="flex flex-col gap-1 overflow-hidden">
          <p className="text-sm font-semibold leading-[1.3] line-clamp-2 text-white">
            {video?.title}
          </p>
          <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
            <span className="truncate">{video?.channel?.channelName}</span>
            <FontAwesomeIcon icon={faCircleCheck} className="text-gray-500 text-[9px] flex-shrink-0" />
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{formatTimeAgo(video?.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}