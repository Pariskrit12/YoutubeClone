import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
export default function Video() {
  return (
    <div className="bg-gray-700 flex w-[50rem] rounded-xl border-1 border-gray-400 gap-[1rem] mb-[1rem] text-white cursor-pointer ">
      <div>
        <img
          src=""
          className="rounded-xl mb-0.5 h-[10rem] w-[15rem] border-[1px]"
        />
      </div>
      <div>
        <div className="">
          <p className="text-2xl font-bold">
            Title dadasd asdasdadasdasdasdasdds addadas dada
          </p>
        </div>
        <div className="flex gap-[1rem]">
          <div className="flex items-center gap-[2px]">
            <p>sadasdasdd</p>
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <p>Views</p>
        </div>
        <p>Description dasdadasdasdadas
            dasdasdsaad adasdasdasdassadadasd dasdasdas</p>
      </div>
      <div className=" h-[2rem] flex items-center">
        <FontAwesomeIcon icon={faCaretDown} className="px-[3px] text-xl  "/>
      </div>
    </div>
  );
}
