import { icon } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
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
export default function EditPage() {
  const editItems = [
    {
      label: "Update Your channel Name",
      icon: faPenToSquare,
      path: "channelName",
    },
    {
      label: "Update Your channel Avatar",
      icon: faPenToSquare,
      path: "channelAvatar",
    },
    {
      label: "Update Your channel Banner",
      icon: faPenToSquare,
      path: "channelBanner",
    },
    {
      label: "Delete Your channel ",
      icon: faPenToSquare,
      path: "deleteChannel",
    },
  ];
  const {channelId}=useParams();

  
  const [activeKey, setActiveKey] = useState("");

  return (
    <div className="w-full  p-[1rem] ">
      <p className="text-2xl font-bold mb-[1rem]">Edit Your Channel</p>
      <p className="border-[1px] border-gray-500 mb-[1rem] "></p>
      <div className="flex  justify-between p-[1rem] ">
        <div className="w-[32rem]  rounded-xl   ">
          {editItems.map((item) => (
            <EditItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              onClick={() => setActiveKey(item.path)}
            />
          ))}
        </div>
        <div className="w-[40rem]  rounded-xl p-[2rem] items-center justify-center flex flex-col">
          <EditComponent activeKey={activeKey}  channelId={channelId} setActiveKey={setActiveKey}/>
        </div>
      </div>
    </div>
  );
}
