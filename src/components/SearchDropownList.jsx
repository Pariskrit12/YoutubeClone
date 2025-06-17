import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SearchDropownList({ result ,onClick}) {
  return (
    <div className="flex items-center text-[1rem]  gap-[1rem] text-white mb-[2rem] hover:bg-gray-600 cursor-pointer rounded-xl p-[0.5rem] " onClick={()=>onClick(result)}>
      <FontAwesomeIcon icon={faSearch} />
      <p> {result.title}</p>
    </div>
  );
}
