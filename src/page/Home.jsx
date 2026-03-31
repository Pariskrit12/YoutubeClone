import VideoCard from "../components/VideoCard";
import { useGetAllVideosQuery, useGetRecommendationsQuery } from "../api/videoApi";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  // Fetch recommended videos only if logged in
  const { data: recommendedData, isLoading: recommendedLoading, isError: recommendedError } =
    useGetRecommendationsQuery(undefined, { skip: !isLoggedIn });

  // Always fetch all public videos
  const { data: allVideosData, isLoading: allVideosLoading, isError: allVideosError } =
    useGetAllVideosQuery();

  if (allVideosLoading || (isLoggedIn && recommendedLoading)) return <Spinner />;

  if (allVideosError) return <p className="text-red-500">Error fetching videos.</p>;
  if (recommendedError) console.log("Error fetching recommendations");
  
  const videosToShow = isLoggedIn ? recommendedData?.data : allVideosData?.data;

  return (
    <div className="grid grid-cols-3 gap-10  mt-5">
      {videosToShow?.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}