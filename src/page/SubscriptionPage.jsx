import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChannelCard from "../components/ChannelCard";

export default function SubscriptionPage() {
    const [channels,setChannels]=useState([]);
    useEffect(()=>{
        const fetchChannel=async()=>{
           try {
             const response=await axios.get('/api/v1/channels/subscribed-channel',{withCredentials:true})
             console.log(response.data.data);
             setChannels(response.data.data)
           } catch (error) {
            console.log("Failed to fetch subscribed channel",error)
           }
        }
        fetchChannel()
    },[])
  return (
    <div className="w-full">
      <div className="p-[2rem] flex items-center gap-[1rem]">
        <FontAwesomeIcon icon={faBell} className="text-7xl text-red-700" />
        <p className="text-xl font-bold">Subscribed Channel</p>
      </div>
      <div className="border-b-1 mb-[2rem] border-gray-500"></div>
      <div>
        <div>
            {channels.map((channel)=>(
              <ChannelCard channel={channel} key={channel._id}/>
            ))}
        </div>
      </div>
    </div>
  );
}
