import React, { useRef, useState, useMemo } from "react";
import {
  useDeletChannelMutation,
  useUpdateChannelAvatarMutation,
  useUpdateChannelBannerMutation,
  useUpdateChannelMutation,
} from "../api/channelApi";
import {
  useDeleteVideoMutation,
  useUpdateVideoThumbnailMutation,
  useUpdateVideoTitleOrDescriptionMutation,
} from "../api/videoApi";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

export default function EditComponent({
  channelId,
  videoId,
  videoChannelId,
  activeKey,
  setActiveKey,
}) {
  const navigate = useNavigate();

  // Channel
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);

  const [updateChannel, { isLoading: updateChannelInfoLoading }] =
    useUpdateChannelMutation();
  const [updateChannelAvatar, { isLoading: updateAvatarLoading }] =
    useUpdateChannelAvatarMutation();
  const [updateChannelBanner, { isLoading: updateChannelBannerLoading }] =
    useUpdateChannelBannerMutation();
  const [deleteChannel, { isLoading: deleteChannelLoading }] =
    useDeletChannelMutation();

  // Video
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [updateVideoTitleOrDescription, { isLoading: updateVideoInfoLoading }] =
    useUpdateVideoTitleOrDescriptionMutation();
  const [updateVideoThumbnail, { isLoading: updateVideoThumbnailLoading }] =
    useUpdateVideoThumbnailMutation();
  const [deleteVideo, { isLoading: videoDeleteLoading }] =
    useDeleteVideoMutation();

  // Refs
  const fileInputRef = useRef();
  const bannerInputRef = useRef();

  // Payloads
  const payloadChannel = useMemo(() => {
    const payload = {};
    if (channelName.trim()) payload.channelName = channelName;
    if (description.trim()) payload.description = description;
    return payload;
  }, [channelName, description]);

  const payloadVideo = useMemo(() => {
    const payload = {};
    if (videoTitle.trim()) payload.title = videoTitle;
    if (videoDescription.trim()) payload.description = videoDescription;
    return payload;
  }, [videoTitle, videoDescription]);

  // Handlers
  const handleOnUpdateChannelNameOrDescription = async (e) => {
    e.preventDefault();
    try {
      await updateChannel({ channelId, ...payloadChannel }).unwrap();
      setChannelName("");
      setDescription("");
      toast.success("Channel Updated Successfully")
      console.log("Successfully updated channel info");
    } catch (error) {
      console.log("Error updating channel info:", error);
    }
  };

  const handleOnClickUpdateVideoInfo = async () => {
    try {
      await updateVideoTitleOrDescription({ videoId, ...payloadVideo });
      setVideoTitle("");
      setVideoDescription("");
      toast.success("Video Updated Successfully")
      console.log("Successfully updated video info");
    } catch (error) {
      console.log("Error updating video info:", error);
    }
  };

  const handleOnUpdateChannelAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);
    try {
      await updateChannelAvatar({ channelId, formData });
      setAvatar(null);
      fileInputRef.current.value = "";
    } catch (error) {
      console.log("Error updating avatar:", error);
    }
  };

  const updateVideoThumbnailOnClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (thumbnail) formData.append("thumbnail", thumbnail);
    try {
      await updateVideoThumbnail({ videoId, formData });
      setThumbnail(null);
      fileInputRef.current.value = "";
      console.log("Thumbnail updated");
    } catch (error) {
      console.log("Thumbnail update failed:", error);
    }
  };

  const handleOnUpdateChannelBanner = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (banner) formData.append("banner", banner);
    try {
      await updateChannelBanner({ channelId, formData });
      setBanner(null);
      bannerInputRef.current.value = "";
      console.log("Banner updated");
    } catch (error) {
      console.log("Banner update failed:", error);
    }
  };

  const handleOnDelete = async () => {
    try {
      await deleteChannel(channelId);
      navigate("/");
      console.log("Channel deleted");
    } catch (error) {
      console.log("Failed to delete channel:", error);
    }
  };

  const handleOnDeleteVideo = async () => {
    try {
      await deleteVideo({ videoId, channelId:videoChannelId });
      console.log("Video deleted successfully");
    } catch (error) {
      console.log("Failed to delete video:", error);
    }
  };

  return (
    <>
      {(activeKey === "channelName" || activeKey === "videoTitle") && (
        <div className="flex flex-col items-center">
          <input
            value={activeKey === "channelName" ? channelName : videoTitle}
            onChange={(e) =>
              activeKey === "channelName"
                ? setChannelName(e.target.value)
                : setVideoTitle(e.target.value)
            }
            placeholder={
              activeKey === "channelName"
                ? "Update Channel Name"
                : "Update Video Title"
            }
            className="border w-[20rem] h-[3rem] p-4 rounded-2xl mb-4 focus:outline-none"
          />
          <input
            value={activeKey === "channelName" ? description : videoDescription}
            onChange={(e) =>
              activeKey === "channelName"
                ? setDescription(e.target.value)
                : setVideoDescription(e.target.value)
            }
            placeholder={
              activeKey === "channelName"
                ? "Update Channel Description"
                : "Update Video Description"
            }
            className="border w-[20rem] h-[3rem] p-4 rounded-2xl mb-4 focus:outline-none"
          />
          <button
            className="w-[5rem] h-[2rem] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-700"
            onClick={
              activeKey === "channelName"
                ? handleOnUpdateChannelNameOrDescription
                : handleOnClickUpdateVideoInfo
            }
          >
            {activeKey === "channelName"
              ? updateChannelInfoLoading
                ? "Loading..."
                : "Update"
              : updateVideoInfoLoading
              ? "Loading..."
              : "Update"}
          </button>
        </div>
      )}

      {(activeKey === "channelAvatar" || activeKey === "videoThumbnail") && (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-evenly w-[25rem] text-xl mb-4">
            <label>
              {activeKey === "channelAvatar" ? "Update Avatar" : "Thumbnail"}
            </label>
            <input
              ref={fileInputRef}
              onChange={(e) =>
                activeKey === "channelAvatar"
                  ? setAvatar(e.target.files?.[0])
                  : setThumbnail(e.target.files?.[0])
              }
              type="file"
              className="border w-[15rem] rounded-xl"
            />
          </div>
          <button
            onClick={
              activeKey === "channelAvatar"
                ? handleOnUpdateChannelAvatar
                : updateVideoThumbnailOnClick
            }
            className="w-[5rem] h-[2rem] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-700"
          >
            {activeKey === "channelAvatar"
              ? updateAvatarLoading
                ? "Loading..."
                : "Update"
              : updateVideoThumbnailLoading
              ? "Loading..."
              : "Update"}
          </button>
        </div>
      )}

      {activeKey === "channelBanner" && (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-evenly w-[25rem] text-xl mb-4">
            <label>Upload Banner:</label>
            <input
              ref={bannerInputRef}
              onChange={(e) => setBanner(e.target.files?.[0])}
              type="file"
              className="border w-[15rem] rounded-xl"
            />
          </div>
          <button
            onClick={handleOnUpdateChannelBanner}
            className="w-[5rem] h-[2rem] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-700"
          >
            {updateChannelBannerLoading ? "Loading..." : "Update"}
          </button>
        </div>
      )}

      {(activeKey === "deleteChannel" || activeKey === "deleteVideo") && (
        <div className="flex flex-col items-center p-4 border border-gray-400 rounded-2xl">
          <p className="mb-4">
            {activeKey === "deleteVideo"
              ? "Are you sure you want to delete the video?"
              : "Are you sure you want to delete the channel?"}
          </p>
          <div className="flex justify-between w-[15rem]">
            {deleteChannelLoading || videoDeleteLoading ? (
              <Spinner />
            ) : (
              <>
                <button
                  onClick={
                    activeKey === "deleteChannel"
                      ? handleOnDelete
                      : handleOnDeleteVideo
                  }
                  className="w-[5rem] h-[2rem] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-700"
                >
                  Yes
                </button>
                <button
                  onClick={() => setActiveKey("")}
                  className="w-[5rem] h-[2rem] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-700"
                >
                  No
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
