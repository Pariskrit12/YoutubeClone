import axios from "axios";
import React, { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UploadVideo from "../components/UploadVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import SubscribeButton from "../components/SubscribeButton";
import { useGetChannelVideoQuery } from "../api/videoApi";
import Spinner from "../components/Spinner";
export default function Channel() {
  const [channel, setChannel] = useState({});

  const { user } = useAuth();
  const { channelId } = useParams();
  useEffect(() => {
    const fetchChannel = async () => {
      const response = await axios(
        `/api/v1/channels/get-channel-info/${channelId}`
      );

      setChannel(response.data.data);
    };
    fetchChannel();
  }, [channelId]);
  let formattedDate = "";
  if (channel?.createdAt) {
    const date = new Date(channel.createdAt);
    if (!isNaN(date)) {
      formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
    }
  }
  const { data, isLoading } = useGetChannelVideoQuery(channelId);

  const videos = data?.data;
  console.log(videos);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className=" w-full py-[3rem]">
      <div className="px-[3rem] mb-[1rem]">
        <img
          className="w-[70rem] h-[10rem] rounded-2xl  border-[1px] border-gray-500"
          src={channel?.banner}
          alt="User avatar"
        ></img>
      </div>
      <div className="flex  items-center">
        <div className=" px-[1rem] h-[10rem] flex items-center gap-[1rem]">
          <img
            className="w-[10rem] h-[10rem] rounded-full"
            src={channel?.avatar}
            alt="User avatar"
          ></img>
        </div>
        <div>
          <div className="flex items-center gap-[1rem]">
            <p className="text-3xl font-extrabold">{channel?.channelName}</p>
            <FontAwesomeIcon className="text-2xl" icon={faCircleCheck} />
          </div>
          <p className="font-semibold text-[20px]">
            Channel Created At: {formattedDate}
          </p>
          {user?.channel._id !== channelId && (
            <SubscribeButton channelId={channelId} />
          )}
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
  );
}
