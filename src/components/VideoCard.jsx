import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const createdAt = new Date(video.createdAt);
  const now = new Date();
  const differenceInMilliseconds = now - createdAt;
  let timeAgo;
  if (differenceInMilliseconds < 60 * 1000) {
    timeAgo = `${Math.floor(differenceInMilliseconds / 1000)} seconds ago`;
  } else if (differenceInMilliseconds < 60 * 60 * 1000) {
    timeAgo = `${Math.floor(
      differenceInMilliseconds / (1000 * 60)
    )} minutes ago`;
  } else if (differenceInMilliseconds < 24 * 60 * 60 * 1000) {
    timeAgo = `${Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60)
    )} hours ago`;
  } else {
    timeAgo = `${Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    )} days ago`;
  }

  const handleOnClickVideo = async () => {
    try {
      await axios.post(`/api/v1/videos/watch-video/${video._id}`);
      navigate(`/video/${video._id}`);
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
              <Link to={`/channel/${video.channel?._id}`}>
                <p>{video.channel.channelName}</p>
              </Link>
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <div className="flex  gap-[1rem]">
              <p>{video.views} views</p>
              <p>{timeAgo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
