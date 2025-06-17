import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Videoc from "../components/Videoc";

export default function SearchResultPage() {
  const [videos, setVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/v1/videos/search-video", {
          params: {query},
        });
        setVideos(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log("failed to fetch search result videos",error);
        
      }
    };
    fetchVideos();
  }, [query]);


  return(
    <div className="w-full p-[2rem]" >
        {videos.map((video)=>(
            <Videoc video={video} key={video._id}/>
        ))}
    </div>
  )
}
