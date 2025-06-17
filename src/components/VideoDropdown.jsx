import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function VideoDropdown({video}) {
    const{channelId}=useParams();
    const handleOnDelete=async()=>{
        await axios.delete(`/delete-video/${video._id}/${channelId}`)
    }
  return (
    <div>
      
    </div>
  )
}
