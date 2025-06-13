import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Videoc from "../components/Videoc.jsx";

export default function WatchHistoryPage() {
  const [videos, setVideos] = useState([]);
  const clearHistory=async()=>{
    try {
      await axios.delete('/api/v1/videos/clear-watch-history',{withCredentials:true});
      setVideos([]);
    } catch (error) {
      console.log("Failed to clear watch history");
    }
  }
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/v1/videos/get-watched-video", {
          withCredentials: true,
        });
        setVideos(response.data.data.data);
        console.log(
          "Successfully fetched watch history data",
          response.data.data
        );
      } catch (error) {
        console.log("Failed to fetch watch history data", error);
      }
    };
    fetchVideos();
  }, []);
  return (
    <div className="w-full ">
      
      <div className="p-[2rem] mb-[1.5rem] ">
        <p className="text-3xl font-extrabold">Watch History</p>
      </div>
        {videos.length>0?(
      <div className="flex">

        <div className=" px-[2rem]">
          {videos.map((video)=>(
            <Videoc video={video} key={video._id}/>
          ))}
        </div>
        <div className="  h-[7rem] p-[1rem] cursor-pointer bg-gray-200 rounded-xl">
          <div className="flex items-center  text-gray-500 mb-2">
            <FontAwesomeIcon icon={faSearch} className="text-3xl " />
            <input
              placeholder="Search"
              className="border-b-1 pl-[1rem] text-2xl outline-none"
            />
          </div>
          <div className=" flex items-center w-[9rem] text-xl text-gray-500 justify-between ml-[6rem]" onClick={clearHistory}>
            <p>Clear history</p>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
        ):(
          <p className="text-2xl font-bold px-[2rem]">You have not watched any video yet</p>
        )}
    </div>
  );
}
