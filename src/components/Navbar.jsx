import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  return (
    <>
      <navbar className=" sticky top-0  shadow z-50 bg-transparent backdrop-blur-2xl p-[1rem] w-full flex items-center  text-2xl text-black justify-between border-b-[1px] border-gray-500">
        <div className="flex items-center">
          <img
            className="w-[3rem]"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
          />
          <p className="font-bold">YouTube</p>
        </div>
        <div className="flex justify-between w-[10rem]">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faCircleUser} />
        </div>
      </navbar>
    </>
  );
}
