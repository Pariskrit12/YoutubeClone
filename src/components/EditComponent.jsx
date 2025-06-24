import React, { useState } from "react";
import {
  useDeletChannelMutation,
  useUpdateChannelAvatarMutation,
  useUpdateChannelBannerMutation,
  useUpdateChannelMutation,
} from "../api/channelApi";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function EditComponent({ channelId, activeKey }) {
  const [channelName, setChannelName] = useState("");
  const [updateChannel, { isLoading }] = useUpdateChannelMutation();
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);
  const navigate = useNavigate();

  let payload = {};
  if (channelName.trim() !== "") {
    payload.channelName = channelName;
  }
  if (description.trim() !== "") {
    payload.description = description;
  }

  const handleOnUpdateChannelNameOrDescription = async (e) => {
    e.preventDefault();
    try {
      await updateChannel({ channelId, ...payload }).unwrap();
      console.log("Successfully updated");
      setChannelName("");
      setDescription("");
    } catch (error) {
      console.log("Error in updating", error);
    }
  };
  const [updateChannelAvatar, { isLoading: updateAvatarLoading }] =
    useUpdateChannelAvatarMutation();

  const handleOnUpdateChannelAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);
    try {
      await updateChannelAvatar({ channelId, formData });
      setAvatar(null);
    } catch (error) {
      console.log("Cannot update avatar", error);
    }
  };

  const [updateChannelBanner, { isLoading: updateChannelBannerLoading }] =
    useUpdateChannelBannerMutation();

  const handleOnUpdateChannelBanner = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (banner) formData.append("banner", banner);
    try {
      await updateChannelBanner({ channelId, formData });
      console.log("Successfully updated channel banner");
    } catch (error) {
      console.log("Failed to update channel banner");
    }
  };

  const [deleteChannel, { isLoading: deleteChannelLoading }] =
    useDeletChannelMutation();
  const handleOnDelete = async () => {
    try {
      await deleteChannel(channelId);
      navigate("/");
      console.log("Successfully deleted channel");
    } catch (error) {
      console.log("Failed to delete channel", error);
    }
  };
  return (
    <>
      {activeKey === "channelName" && (
        <div className=" flex flex-col items-center   ">
          <input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="New Channel Name"
            className="border-[1px] w-[20rem] h-[3rem] p-[1rem] rounded-2xl mb-[1rem] focus:outline-none"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="New Description of channel"
            className="border-[1px] w-[20rem] h-[3rem] p-[1rem] rounded-2xl mb-[1rem] focus:outline-none"
          />
          <button
            className="w-[5rem] h-[2rem] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-700 cursor-pointer"
            onClick={handleOnUpdateChannelNameOrDescription}
          >
            {isLoading ? "Loading..." : "Update"}
          </button>
        </div>
      )}
      {activeKey === "channelAvatar" && (
        <div className="flex flex-col items-center ">
          <div className="flex items-center  justify-evenly w-[25rem] text-xl mb-[1rem]">
            <label>Upload avatar:</label>
            <input
              onChange={(e) => setAvatar(e.target?.files?.[0])}
              type="file"
              className="border-[1px] w-[15rem] rounded-xl"
            />
          </div>
          <button
            onClick={handleOnUpdateChannelAvatar}
            className="w-[5rem] h-[2rem] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-700 cursor-pointer"
          >
            {updateAvatarLoading ? "Loading..." : "Update"}
          </button>
        </div>
      )}
      {activeKey === "channelBanner" && (
        <div className="flex flex-col items-center ">
          <div className="flex items-center  justify-evenly w-[25rem] text-xl mb-[1rem]">
            <label>Upload Banner:</label>
            <input type="file" className="border-[1px] w-[15rem] rounded-xl" />
          </div>
          <button className="w-[5rem] h-[2rem] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-700 cursor-pointer">
            Update
          </button>
        </div>
      )}
      {activeKey === "deleteChannel" && (
        <div className="flex flex-col items-center p-[1rem] border-1 border-gray-400 rounded-2xl justify-center">
          <p className="mb-[1rem]">
            Are you sure you want to delete the channel?
          </p>
          <div className="flex justify-between w-[15rem]">
            {deleteChannelLoading ? (
              <Spinner />
            ) : (
              <>
                <button
                  onClick={handleOnDelete}
                  className="w-[5rem] h-[2rem] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-700 cursor-pointer"
                >
                  Yes
                </button>

                <button className="w-[5rem] h-[2rem] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-700 cursor-pointer">
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
