import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Videoc({ video }) {

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
  
  return (
    <div
      onClick={handleOnClickVideo}
      className="bg-[#0f0f0f] flex w-full max-w-[50rem] rounded-2xl overflow-hidden mb-3 text-white cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200 ease-in-out"
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-[16rem] aspect-video overflow-hidden">
        <img
          src={video?.thumbnail}
          className="w-full h-full object-cover"
          alt={video.title}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 p-4 overflow-hidden">
        <p className="text-base font-semibold leading-snug line-clamp-2 text-white">
          {video.title.length > 50
            ? video.title.slice(0, 50) + "..."
            : video.title}
        </p>

        <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
          <p>{video.channel?.channelName}</p>
          <FontAwesomeIcon icon={faCircleCheck} className="text-gray-500 text-[10px]" />
          <span className="ml-2">{video.views} views</span>
        </div>

        <p className="text-gray-500 text-xs mt-2 line-clamp-2">
          {video.description.length > 100
            ? video.description.slice(0, 100) + "..."
            : video.description}
        </p>
      </div>

      {/* Caret */}
      <div className=" flex items-start pt-4 pr-3 flex-shrink-0">
        <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 text-lg" />
      </div>
    </div>
  );
}
