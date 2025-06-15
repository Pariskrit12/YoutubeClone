import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';


export default function SubscribeButton({channelId}) {
    const{user}=useAuth();
    const[subscribed,setIsSubscribed]=useState(false)
    useEffect(()=>{
        if(user?.subscription){
            const isSubbed=user?.subscription.some((id)=>id.toString()===channelId.toString());
            setIsSubscribed(isSubbed);
        }
    },[user,channelId]);
   

   const toggleSubsscriptionButton=async()=>{
    try {
        if(subscribed){
            await axios.put(`/api/v1/channels/unsubscribe-channel/${channelId}`,{},{withCredentials:true})
           
            setIsSubscribed(false);
        }else{
            await axios.put(`/api/v1/channels/subscribe-channel/${channelId}`,{},{withCredentials:true})
            setIsSubscribed(true)
        }
    } catch (error) {
        console.log();
        console.error("Subscription toggle failed:", error);
    }
   }
    
  return (
    <div>
      <div className="cursor-pointer flex items-center justify-between bg-gray-200 w-[8rem] h-[2.5rem] px-[0.5rem] rounded-2xl border-[1px] border-gray-500" onClick={toggleSubsscriptionButton}>
       
       {subscribed ?"Subscribed":"Subscribe"}
       <FontAwesomeIcon icon={subscribed?faBell:faBellSlash}/>
      </div>
    </div>
  )
}
