import { data, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UploadVideo from "../components/UploadVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import SubscribeButton from "../components/SubscribeButton";
import { useGetChannelVideoQuery } from "../api/channelApi";
import Spinner from "../components/Spinner";
import { useGetChannelInfoQuery } from "../api/channelApi";
import { formatTimeAgo } from "../util/formatTime";
import { Link } from "react-router-dom";
export default function Channel() {
  const { user } = useAuth();
  const { channelId } = useParams();
console.log(user);

  const { data: channelInfo, isLoading: channelInfoLoading } =
    useGetChannelInfoQuery(channelId);
  const channel = channelInfo?.data;

  const { data: channelVideos, isLoading } = useGetChannelVideoQuery(channelId);

  const videos = channelVideos?.data;
 
  if (channelInfoLoading) return <p>Loading</p>;
  return isLoading ? (
    <Spinner />
  ) : (
    <div className=" w-full py-[3rem]">
      <div className="px-[3rem] mb-[1rem]">
        <img
          className="w-[70rem] h-[10rem] rounded-2xl  border-[1px] border-gray-500"
          src={channel?.banner}
          alt="User avatar"
        ></img>
      </div>
      <div className="flex  items-center">
        <div className=" px-[1rem] h-[10rem] flex items-center gap-[1rem]">
          <img
            className="w-[10rem] h-[10rem] rounded-full"
            src={channel?.avatar}
            alt="User avatar"
          ></img>
        </div>
        <div>
          <div className="flex items-center gap-[1rem]">
            <p className="text-3xl font-extrabold">{channel?.channelName}</p>
            <FontAwesomeIcon className="text-2xl" icon={faCircleCheck} />
          </div>
          <p className="font-semibold text-[20px]">
            Channel Created At: {formatTimeAgo(channel?.createdAt)}
          </p>

          {user?.channel?._id !== channelId ? (
            <SubscribeButton channelId={channelId} />
          ) : (
            <Link to={`/edit/${channelId}`}>
            <p className="text-blue-700 underline text-xl font-semibold">Edit</p>
            </Link>
          )}
        </div>
      </div>
      <div className="border-b-[1px] text-xl font-semibold border-gray-500 mt-[10px] mb-[1rem] px-[1.5rem]">
        Posts
      </div>
      <div className=" xl:ml-[1rem] grid grid-cols-2 md:grid-cols-3">
        {videos.map((video) => (
          <UploadVideo video={video} key={video._id} channelId={channelId}/>
        ))}
      </div>
    </div>
  );
}
