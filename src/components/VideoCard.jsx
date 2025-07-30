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
        toast.success("You have to Login first");
        navigate("/login");
      }
    } catch (error) {
      console.log("Failed to watch video", error);
    }
  };

  return (
    <div
      className="xl:w-[23rem] md:w-[14rem] w-[15rem] p-[1rem] ml-[2rem]  mt-[2rem]  rounded-xl border-gray-600  h-[21rem] hover:bg-gray-200 cursor-pointer"
      onClick={handleOnClickVideo}
    >
      <div className="font-semibold">
        <img
          className="rounded-xl mb-0.5 h-[13rem] w-[25rem] border-[1px] "
          src={video.thumbnail}
        />
        <div className="flex items-center gap-[0.2rem]">
          <div>
            <img
              className="w-15 h-12 rounded-full"
              src={video.channel.avatar}
              alt="Rounded avatar"
            ></img>
          </div>
          <div className="flex flex-col  w-[22rem] h-[6rem]  justify-between ">
            <div className=" gap-1">
              <p>
                {video.title.length > 50
                  ? video.title.slice(0, 50) + "..."
                  : video.title}
              </p>
            </div>
            <div className="flex gap-[1rem] items-center">
              <p>{video.channel.channelName}</p>

              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <div className="flex  gap-[1rem]">
              <p>{video.views} views</p>
              <p>{formatTimeAgo(video?.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
