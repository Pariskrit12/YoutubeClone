import VideoCard from "../components/VideoCard";
import { useGetAllVideosQuery } from "../api/videoApi";
export default function Home() {
  const { data, isError, isLoading } = useGetAllVideosQuery();
  const videos = data?.data;

  return (
    <div className=" xl:ml-[1rem] grid grid-cols-2 md:grid-cols-3 ">
      {Array.isArray(videos) &&
        videos?.map((video) => <VideoCard video={video} key={video._id} />)}
    </div>
  );
}
