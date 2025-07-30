import { icon } from "@fortawesome/fontawesome-svg-core";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import EditComponent from "../components/EditComponent";
import { useParams } from "react-router-dom";

export const EditItem = ({ icon, label, onClick }) => (
  <div
    className="text-xl font-semibold mb-[1rem] h-[5rem] flex items-center justify-between hover:bg-gray-700 rounded-xl p-[1rem] border-1 border-gray-500 hover:text-white cursor-pointer"
    onClick={onClick}
  >
    <span>{label}</span>
    <FontAwesomeIcon icon={icon} />
  </div>
);
export default function EditVideo() {
    const {videoId,channelId:videoChannelId}=useParams();
    
    
  const [activeKey, setActiveKey] = useState("");
  const items = [
    {
      label: "Update Your Video Title",
      icon: faPenSquare,
      key: "videoTitle",
    },
    {
      label: "Update Your Video Thumbnail",
      icon: faPenSquare,
      key: "videoThumbnail",
    },
    {
      label: "Delete The Video",
      icon: faTrash,
      key: "deleteVideo",
    },
  ];
  return (
    <div className="w-full  p-[1rem] ">
      <p className="text-2xl font-bold mb-[1rem]">Edit Your Channel</p>
      <p className="border-[1px] border-gray-500 mb-[1rem] "></p>
      <div className="flex  justify-between p-[1rem] ">
        <div className="w-[32rem]  rounded-xl   ">
          {items.map((item) => (
            <EditItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              onClick={() => setActiveKey(item.key)}
            />
          ))}
        </div>
        <div className="w-[40rem]  rounded-xl p-[2rem] items-center justify-center flex flex-col">
          <EditComponent activeKey={activeKey} videoId={videoId} videoChannelId={videoChannelId} setActiveKey={setActiveKey} />
        </div>
      </div>
    </div>
  );
}
