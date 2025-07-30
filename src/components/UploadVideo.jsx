import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { use, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { formatTimeAgo } from "../util/formatTime";
import { Link, useNavigate } from "react-router-dom";

export default function UploadVideo({ video, channelId }) {
  const {user}=useAuth();
  const[dropdown,setDropdown]=useState(false);
  const dropdownRef=useRef();
  const videoId=video._id
 
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
    <div>
      <div className="xl:w-[20rem] md:w-[14rem] w-[15rem] p-[1rem] ml-[2rem]  mt-[2rem]  rounded-xl border-gray-600">
        <div className="font-semibold ">
          <img
            className="rounded-xl mb-0.5 h-[13rem] w-[25rem] border-[1px] "
            src={video.thumbnail}
          />
          <div className=" flex">
            <div className="flex items-center gap-[0.5rem] w-[17rem] ">
              <div className="flex flex-col  mr-[40px]">
                <div className=" gap-1">
                  <p>
                    {video.title.length > 25
                      ? video.title.slice(0, 25) + "..."
                      : video.title}
                  </p>
                </div>
                <div className="flex  gap-[1rem]">
                  <p>{video.views} views</p>
                  <p>{formatTimeAgo(video.createdAt)}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">

            {user.channel?._id === channelId && (
              <div onClick={()=>setDropdown(true)}>
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faCaretDown}
                />
              </div>
            )}
            {dropdown && (
             <>
             <Link to={`/edit-video/${videoId}/${channelId}`}>
             <div ref={dropdownRef} className="bg-gray-900 text-white w-[3rem] flex justify-center rounded-xl cursor-pointer">
              <p>Edit</p>
             </div>
             </Link>
             </>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
