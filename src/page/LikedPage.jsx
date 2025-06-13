import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Videoc from "../components/Videoc";

export default function LikedPage() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/v1/videos/get-liked-video", {
          withCredentials: true,
        });
        setVideos(response.data.data)
        console.log("Successfully fetched liked video", response.data.data);
      } catch (error) {
        console.log("Failed to fetch liked video", error);
      }
    }
    fetchVideos();
  },[]);
  return (
    <div className="w-full">
      <div className="p-[2rem] flex items-center gap-[1rem]">
        <FontAwesomeIcon icon={faThumbsUp} className="text-7xl text-blue-700" />
        <p className="text-xl font-bold">Liked</p>
      </div>
      <div className="border-b-1 mb-[2rem] border-gray-500"></div>
      <div>
        {videos.map((video)=>(
            <Videoc video={video} key={video._id}/>
        ))}
      </div>
    </div>
  );
}
