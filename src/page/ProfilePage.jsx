import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import VideoCard from "../components/VideoCard";
import SavedVideoList from "../components/SavedVideoList";

export default function ProfilePage() {
  const { user } = useAuth();
  let formattedDate = "";
  if (user?.createdAt) {
    const date = new Date(user.createdAt);
    if (!isNaN(date)) {
      formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
    }
  }
  const videos = user?.savedVideos || [];

  return (
    <>
      <div className=" w-full py-[3rem]">
        <div className="-200 px-[1rem] h-[10rem] flex items-center gap-[1rem]">
          <img
            className="w-[10rem] h-[10rem] rounded-full"
            src={user?.avatar}
            alt="User avatar"
          ></img>
          <div className="flex flex-col">
            <p className="text-3xl font-extrabold">{user?.name}</p>
            <p className=" text-[20px]">{user?.email}</p>
            <p className="text-[20px]">Joined At: {formattedDate}</p>
          </div>
        </div>
        <div className="border-b-[1px] text-xl font-semibold border-gray-500 mt-[10px] mb-[1rem]">
          Saved Videos
        </div>
        <div className=" xl:ml-[1rem] grid grid-cols-2 md:grid-cols-3">
          {videos.map((video) => (
            <SavedVideoList video={video} key={video._id} />
          ))}
        </div>
      </div>
    </>
  );
}
