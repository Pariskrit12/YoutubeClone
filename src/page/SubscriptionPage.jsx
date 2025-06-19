import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChannelCard from "../components/ChannelCard";
import { useGetSubscribedChannelOfUserQuery } from "../api/videoApi";
import Spinner from "../components/Spinner";

export default function SubscriptionPage() {
  const { data, isLoading, isError, error } =
    useGetSubscribedChannelOfUserQuery();

  const channels = data?.data;

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full">
      <div className="p-[2rem] flex items-center gap-[1rem]">
        <FontAwesomeIcon icon={faBell} className="text-7xl text-red-700" />
        <p className="text-xl font-bold">Subscribed Channel</p>
      </div>
      <div className="border-b-1 mb-[2rem] border-gray-500"></div>
      <div>
        <div>
          {channels.map((channel) => (
            <ChannelCard channel={channel} key={channel._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
