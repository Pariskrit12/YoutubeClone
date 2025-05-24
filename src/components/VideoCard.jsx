import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
export default function VideoCard() {
  return (
    <div className="xl:w-[20rem] w-[15rem] p-[1rem] ml-[2rem]  mt-[2rem] border-1 rounded-xl border-gray-600">
      <div className="font-semibold">
        <img
          className="rounded-xl "
          src="https://www.hollywoodreporter.com/wp-content/uploads/2024/11/FotoJet-2024-11-20T171710.080.jpg?w=1920&h=1080&crop=1"
        />
        <div className="flex items-center gap-1">
          <FontAwesomeIcon className="text-[2.5rem]" icon={faCircleUser} />
          <p>Sidemen 100$ vs 100000$ Road Trip</p>
        </div>
        <div className="flex items-center px-[2.7rem] gap-[5px]">
          <p>Sidemen</p>
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <div className="flex pl-[2.7rem] gap-[1rem]">
          <p>1M views</p>
          <p>1hr Ago</p>
        </div>
      </div>
    </div>
  );
}
