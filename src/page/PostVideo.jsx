import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
import { usePostVideoMutation } from "../api/videoApi";
import { toast } from "react-toastify";
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
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={type === "file" ? undefined : value}
      {...(type === "file" ? { accept: "image/*,video/*" } : {})}
    />
  </div>
);
export default function PostVideo() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  const handleTagChange = (e) => {
    const value = e.target.value;
    const tagArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    setTags(tagArray);
  };
  const [postVideo, { isLoading: postVideoLoading }] = usePostVideoMutation();
  const channelId = user?.channel?._id;
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags));
    if (video) formData.append("video", video);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await postVideo({ channelId, formData }).unwrap();
      toast.success("Successfully Uploaded Video")
      navigate("/");
      console.log("Uploaded successfully");
    } catch (error) {
      console.log("Failed to upload video");
    }
  };
 
  return (
    <div className="flex w-full mt-[3rem]">
      <form
        onSubmit={handleOnSubmit}
        className="w-[50rem] mx-auto flex justify-between  border-[1px] border-gray-400 h-[28rem] rounded-2xl py-[1rem] px-[1rem]"
      >
        <div className="flex flex-col items-center">
          <FormItem
            label="Title"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of your video"
            required
          />
          <FormItem
            label="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            placeholder="Description of your video"
            required
          />
          <FormItem
            label="Tags"
            type="text"
            id="tags"
            onChange={handleTagChange}
            placeholder="Tags of your video"
            required
          />
          <FormItem
            label="Thumbnail"
            type="file"
            id="thumbnail"
            required
            onChange={(e) => setThumbnail(e.target.files?.[0])}
          />
        </div>
        <div>
          <FormItem
            label="Video"
            type="file"
            id="video"
            required
            onChange={(e) => setVideo(e.target.files?.[0])}
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {postVideoLoading?"Loading....":"Upload"}
          </button>
        </div>
      </form>
    </div>
  );
}
