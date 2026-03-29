import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateChannelMutation } from "../api/channelApi";
import { updateUser } from "../store/slice/auth";
import { useDispatch, useSelector } from "react-redux";

const FormItem = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  required = true,
}) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={type === "file" ? undefined : value}
      {...(type === "file" ? { accept: "image/*" } : {})}
    />
  </div>
);

export default function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ FIX: get userData from redux
  const userData = useSelector((state) => state.auth.user);

  const [createChannel, { isLoading }] = useCreateChannelMutation();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("channelName", channelName);
      formdata.append("description", description);

      if (avatar) formdata.append("avatar", avatar);
      if (banner) formdata.append("banner", banner);

      const res = await createChannel(formdata).unwrap();

      console.log("Response:", res);

      // ✅ FIX: update redux user
      dispatch(
        updateUser({
          ...userData,
          user: {
            ...userData.user,
            channel: res.data._id, // channel id
          },
        })
      );

      navigate("/");
    } catch (error) {
      console.log("Failed in creating channel", error);
    }
  };

  return (
    <div className="flex w-full mt-[3rem]">
      <form
        onSubmit={handleOnSubmit}
        className="w-[25rem] mx-auto flex flex-col items-center border-[1px] h-[28rem] rounded-2xl py-[1rem]"
      >
        <FormItem
          label="Channel Name"
          id="channelName"
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="channel name"
        />

        <FormItem
          label="Description"
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="channel description"
        />

        <FormItem
          label="Channel avatar"
          id="channel-avatar"
          onChange={(e) => setAvatar(e.target.files?.[0])}
          type="file"
        />

        <FormItem
          label="Channel banner"
          id="channel-banner"
          onChange={(e) => setBanner(e.target.files?.[0])}
          type="file"
        />

        {/* ✅ FIX: prevent double click */}
        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}