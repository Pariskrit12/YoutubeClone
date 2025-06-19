import { faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SuggestedVideo({video}) {
  const navigate=useNavigate();
  const handleOnClick=async()=>{
    try {
       await axios.post(`/api/v1/videos/watch-video/${video._id}`)
      navigate(`/video/${video?._id}`);
    } catch (error) {
      console.log("Error in watching video",error);
      
    }
  }

    const createdAt = new Date(video?.createdAt);
  const now = new Date();
  const differenceInMilliseconds = now - createdAt;
  let timeAgo;
  if (differenceInMilliseconds < 60 * 1000) {
    timeAgo = `${Math.floor(differenceInMilliseconds / 1000)} seconds ago`;
  } else if (differenceInMilliseconds < 60 * 60 * 1000) {
    timeAgo = `${Math.floor(
      differenceInMilliseconds / (1000 * 60)
    )} minutes ago`;
  } else if (differenceInMilliseconds < 24 * 60 * 60 * 1000) {
    timeAgo = `${Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60)
    )} hours ago`;
  } else {
    timeAgo = `${Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    )} days ago`;
  return (
    <div onClick={handleOnClick} className='w-full  border-[2px] rounded-2xl mb-[1rem] text-white hover:bg-gray-800 cursor-pointer'>
     <div className='flex  gap-[5px]'>
        <div>
            <img
          src={video?.thumbnail}
          className="rounded-xl  h-[7rem] w-[10rem] border-r-[1px]"
        />
        </div>
        <div className='flex flex-col  justify-evenly'>
            <p className='font-bold'>{video?.title?.length>20?video.title.slice(0,20)+"...":video?.title}</p>
            <div className='flex items-center gap-[10px]'>
                <p>{video?.channel?.channelName}</p>
                <FontAwesomeIcon icon={faCircleCheck}/>
            </div>
        <div className='flex items-center gap-[10px]'>
            <p>{video.views} views</p>
            <p>{timeAgo}</p>
        </div>
        </div>
     </div>
    </div>
  )
}
}