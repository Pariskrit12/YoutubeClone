import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import VideoCard from "../components/VideoCard";
import SavedVideoList from "../components/UploadVideo";
import { Link } from "react-router-dom";
import axios from "axios";
import { useGetSavedVideoQuery } from "../api/videoApi";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import { formatTimeAgo } from "../util/formatTime";

export default function ProfilePage() {
 const user=useSelector((state)=>state.auth.user)
console.log(user.user);

  let formattedDate = "";
  if (user?.createdAt) {
    const date = new Date(user.createdAt);
    if (!isNaN(date)) {
      formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
    }
  }
  
  const { data, isLoading } = useGetSavedVideoQuery();
  const videos = data?.data;
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full min-h-screen ">
      {/* Profile header */}
      <div className="flex items-center gap-6 px-8 py-8 border-b border-gray-800">
        <img
          className="w-24 h-24 rounded-full object-cover flex-shrink-0"
          src={user?.user?.avatar}
          alt="User avatar"
        />
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-extrabold">{user?.user?.name}</p>
          <p className="text-gray-400 text-sm">{user.user?.email}</p>
          <p className="text-gray-500 text-xs">Joined {formatTimeAgo(user?.user?.createdAt)}</p>
          {user?.user?.channel && (
            <Link to={`/channel/${user.user?.channel}`}>
              <p className="text-blue-400 hover:text-blue-300 underline text-xs font-semibold mt-1 transition-colors">
                View Channel
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* Saved videos */}
      <div className="px-8 pt-6">
        <p className="text-base font-semibold  mb-4">Saved Videos</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard video={video} key={video._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
