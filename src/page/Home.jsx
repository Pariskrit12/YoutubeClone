import VideoCard from "../components/VideoCard";
import { useGetAllVideosQuery } from "../api/videoApi";
import Spinner from "../components/Spinner";

export default function Home() {
  const { data, isError, isLoading } = useGetAllVideosQuery();
  if (isLoading) return <p className="text-white">Loading...</p>;
  if (isError) return <p className="text-red-500">Error fetching videos.</p>;
  const videos = data?.data;

  return isLoading ? (
    <Spinner />
  ) : (
    <div className=" xl:ml-[1rem] grid grid-cols-2 md:grid-cols-3 ">
      {Array.isArray(videos) &&
        videos?.map((video) => <VideoCard video={video} key={video._id} />)}
    </div>
  );
}
