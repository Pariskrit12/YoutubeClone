import React from "react";
import { formatTimeAgo } from "../../../util/formatTime";
import { Link } from "react-router-dom";

export default function UsersList({ user }) {
  return (
    <div className="w-full bg-gray-900 text-white border-[1px] rounded-md grid grid-cols-5  items-center p-[0.5rem]  mb-[10px] cursor-pointer">
      <img
        className="w-11 h-11 border-[1px] rounded-full"
        src={user?.avatar}
        alt="Rounded avatar"
      ></img>
      <p>Username: {user?.username}</p>
      <Link to={`/channel/${user?.channel?._id}`}>
      <p className="text-blue-700 underline ">Channel: {user?.channel?.channelName ||"No Channel"}</p>
      </Link>
      <p>Role: {user?.role}</p>
      <p>Joined: {formatTimeAgo(user?.createdAt)}</p>
    </div>
  );
}
