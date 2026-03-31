import { faCheck, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../util/formatTime";

export default function SuggestedVideo({ video }) {
  const navigate = useNavigate();
  const handleOnClick = async () => {
    try {
      await axios.post(`/api/v1/videos/watch-video/${video._id}`);
      navigate(`/video/${video?._id}`);
    } catch (error) {
      console.log("Error in watching video", error);
    }
  };

  return (
    <div
      onClick={handleOnClick}
      className="w-full  border-[2px] rounded-2xl mb-[1rem] text-white hover:bg-gray-800 cursor-pointer"
    >
      <div className="flex  gap-[5px]">
        <div>
          <img
            src={video?.thumbnail}
            className="rounded-xl  h-[7rem] w-[10rem] border-r-[1px]"
          />
        </div>
        <div className="flex flex-col  justify-evenly">
          <p className="font-bold">
            {video?.title?.length > 20
              ? video.title.slice(0, 20) + "..."
              : video?.title}
          </p>
          <div className="flex items-center gap-[10px]">
            <p>{video?.channel?.channelName}</p>
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <div className="flex items-center gap-[10px]">
            <p>{video.views} views</p>
            <p>{formatTimeAgo(video?.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
