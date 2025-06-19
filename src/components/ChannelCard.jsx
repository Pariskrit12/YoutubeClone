import React from "react";

import SubscribeButton from "./SubscribeButton";
export default function ChannelCard({ channel }) {
  console.log("here",channel);
  
  return (
    <div className="bg-gray-900 w-[60rem] flex items-center h-[12rem] p-[1rem] justify-between rounded-2xl border-[1px] border-gray-400 mb-[2rem]">
      <div className="">
        <img
          className="w-[10rem] bg-black h-[10rem] rounded-full "
          src={channel?.avatar}
          alt="User avatar"
        ></img>
      </div>
      <div className="flex flex-col justify-evenly  w-[35rem] h-[7rem] text-[15px] text-white font-bold">
        <p>{channel?.channelName}</p>
        <p>
          {channel?.description?.length > 50
            ? channel.description.slice(0, 50) + "..."
            : channel.description}
        </p>
        <p>{channel?.subscribers.length} subscribers</p>
      </div>

      <SubscribeButton channelId={channel?._id} />
    </div>
  );
}
