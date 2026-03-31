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
  console.log(channel);
  

  const { data: channelVideos, isLoading } = useGetChannelVideoQuery(channelId);

  const videos = channelVideos?.data;
 
  if (channelInfoLoading) return <p>Loading</p>;
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full min-h-screen ">
      {/* Banner */}
      <div className="w-full px-6 pt-6">
        <img
          className="w-full h-[12rem] object-cover rounded-2xl"
          src={channel?.channel?.banner}
          alt="Channel banner"
        />
      </div>

      {/* Profile section */}
      <div className="flex items-center gap-5 px-8 py-6 border-b border-gray-800">
        <img
          className="w-24 h-24 rounded-full object-cover flex-shrink-0"
          src={channel.channel?.avatar}
          alt="Channel avatar"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-extrabold">{channel?.channel?.channelName}</p>
            <FontAwesomeIcon className="text-gray-400 text-lg" icon={faCircleCheck} />
          </div>
          <p className="text-gray-400 text-sm">
            Created {formatTimeAgo(channel?.channel?.createdAt)}
          </p>
          <div className="mt-2">
            {user?.channel?._id !== channelId ? (
              <SubscribeButton channelId={channelId} />
            ) : (
              <Link to={`/edit/${channelId}`}>
                <p className="text-blue-400 hover:text-blue-300 underline text-sm font-semibold transition-colors">
                  Edit channel
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Videos section */}
      <div className="px-8 pt-6">
        <p className="text-base font-semibold  mb-4">Videos</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <UploadVideo video={video} key={video._id} channelId={channelId} />
          ))}
        </div>
      </div>
    </div>
  );
}
