import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import Videoc from "../components/Videoc";
import { useGetPopularVideosQuery } from "../api/videoApi";
import Spinner from "../components/Spinner";

export default function PopularPage() {
  const { data, isLoading, isError } = useGetPopularVideosQuery();
  console.log(data);
  
  const videos = data?.data?.paginatedPopularVideo;
  console.log(videos);
  

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full">
      <div className="p-[2rem] flex items-center gap-[1rem]">
        <FontAwesomeIcon icon={faBolt} className="text-7xl text-yellow-400" />
        <p className="text-xl font-bold">Popular Videos</p>
      </div>
      <div className="border-b-1 mb-[2rem] border-gray-500"></div>
      <div>
        {videos.map((video) => (
          <Videoc video={video} key={video._id} />
        ))}
      </div>
    </div>
  );
}
