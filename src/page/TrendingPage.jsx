import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Videoc from "../components/Videoc";
import axios from "axios";
import { useGetTrendingVideoQuery } from "../api/videoApi";
import Spinner from "../components/Spinner";

export default function TrendingPage() {
  const { data, isLoading } = useGetTrendingVideoQuery();
  const videos=data?.data?.paginatedTrendingVideo

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full ">
      <div className="p-[2rem]   flex items-center gap-[1rem]">
        <FontAwesomeIcon icon={faFire} className="text-7xl text-red-700" />
        <p className="text-xl font-bold">Trending Videos</p>
      </div>
      <div className="border-b-1 mb-[2rem] border-gray-500"></div>
      <div className="pl-[2rem]"></div>
      <div>
        {videos.map((video) => (
          <Videoc video={video} key={video._id} />
        ))}
      </div>
    </div>
  );
}
