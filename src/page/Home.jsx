import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
export default function Home() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchAllVideos = async () => {
      const response = await axios.get("/api/v1/videos/get-all-video");
      console.log(response.data.data);
      setVideos(response.data.data);
    };
    fetchAllVideos();
  },[]);
  return (
    <div className=" xl:ml-[1rem] grid grid-cols-2 md:grid-cols-3 ">
      {videos.map((video)=>(
        <VideoCard video={video} key={video._id}/>
      ))}
    </div>
  );
}
