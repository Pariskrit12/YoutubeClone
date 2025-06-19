import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Videoc from "../components/Videoc";
import { useGetLikedVideoQuery } from "../api/videoApi";
import Spinner from "../components/Spinner";

export default function LikedPage() {
  const { data, isError, isLoading } = useGetLikedVideoQuery();
  const videos = data?.data;

  return isLoading ? (
    <Spinner/>
  ) : (
    <div className="w-full">
      <div className="p-[2rem] flex items-center gap-[1rem]">
        <FontAwesomeIcon icon={faThumbsUp} className="text-7xl text-blue-700" />
        <p className="text-xl font-bold">Liked</p>
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
