import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default function Videoc({ video }) {
  
  return (
    <div className="bg-gray-700 flex w-[50rem] rounded-xl border-1 border-gray-400 gap-[1rem] mb-[1rem] text-white cursor-pointer ">
      <div>
        <img
          src={video?.thumbnail}
          className="rounded-xl mb-0.5 h-[10rem] w-[15rem] border-[1px]"
        />
      </div>
      <div className=" w-[33rem] flex flex-col justify-evenly">
        <div className="">
          <p className="text-2xl font-bold">
            {video.title.length > 50
              ? video.title.slice(0, 50) + "..."
              : video.title}
          </p>
        </div>
        <div className="flex gap-[1rem]">
          <div className="flex items-center gap-[2px]">
            <p>{video.channel?.channelName}</p>
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <p>{video.views} views</p>
        </div>
        <p>
          {video.description.length > 100
            ? video.description.slice(0, 100) + "..."
            : video.description}
        </p>
      </div>
      <div className=" h-[2rem] flex items-center">
        <FontAwesomeIcon icon={faCaretDown} className="px-[3px] text-xl  " />
      </div>
    </div>
  );
}
