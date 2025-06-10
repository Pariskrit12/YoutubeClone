import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UploadVideo from "../components/UploadVideo";

export default function Channel() {
  const [videos, setVideos] = useState([]);
  const { user } = useAuth();
  const { channelId } = useParams();
  let formattedDate = "";
  if (user?.channel?.createdAt) {
    const date = new Date(user.createdAt);
    if (!isNaN(date)) {
      formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
    }
  }
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `/api/v1/channels/get-channel-video/${channelId}`
        );
        setVideos(response.data.data);
      } catch (error) {}
    };
    fetchVideos();
  });

  return (
    <>
      <div className=" w-full py-[3rem]">
        <div className="flex  items-center">
          <div className=" px-[1rem] h-[10rem] flex items-center gap-[1rem]">
            <img
              className="w-[10rem] h-[10rem] rounded-full"
              src={user?.channel.avatar}
              alt="User avatar"
            ></img>
          </div>
          <div>
            <p className="text-3xl font-extrabold">
              {user?.channel.channelName}
            </p>
            <p className="font-semibold text-[20px]">
              Channel Created At: {formattedDate}
            </p>
          </div>
        </div>
        <div className="border-b-[1px] text-xl font-semibold border-gray-500 mt-[10px] mb-[1rem] px-[1.5rem]">
          Posts
        </div>
        <div className=" xl:ml-[1rem] grid grid-cols-2 md:grid-cols-3">
          {videos.map((video) => (
            <UploadVideo video={video} key={video._id} />
          ))}
        </div>
      </div>
    </>
  );
}
