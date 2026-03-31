import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Videoc from "../components/Videoc.jsx";
import { useGetWatchedVideoQuery } from "../api/videoApi.js";
import Spinner from "../components/Spinner.jsx";

export default function WatchHistoryPage() {
  const [videos, setVideos] = useState([]);
  const clearHistory = async () => {
    try {
      await axios.delete("/api/v1/videos/clear-watch-history", {
        withCredentials: true,
      });
      setVideos([]);
    } catch (error) {
      console.log("Failed to clear watch history");
    }
  };
  const { data, isLoading, isError } = useGetWatchedVideoQuery();

  useEffect(() => {
    if (data?.data?.data) {
      setVideos(data?.data?.data);
    }
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full min-h-screen  text-white px-8 py-6">
      {/* Header */}
      <h1 className="text-3xl font-extrabold mb-6">Watch History</h1>

      {videos.length > 0 ? (
        <div className="flex gap-8 items-start">
          {/* Video list */}
          <div className="flex flex-col gap-3 flex-1">
            {videos.map((video) => (
              <Videoc video={video} key={video._id} />
            ))}
          </div>

          {/* Sidebar: search + clear */}
          <div className="sticky top-6 w-[16rem] flex-shrink-0 bg-[#1a1a1a] rounded-2xl p-4 flex flex-col gap-4 shadow-md">
            <div className="flex items-center gap-2 bg-[#272727] rounded-xl px-3 py-2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
              <input
                placeholder="Search history"
                className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
              />
            </div>
            <div
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#272727] hover:bg-red-900/40 text-gray-400 hover:text-red-400 transition-colors duration-150 cursor-pointer text-sm"
              onClick={clearHistory}
            >
              <p>Clear history</p>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xl font-semibold text-gray-400">
          You have not watched any video yet.
        </p>
      )}
    </div>
  );
}
