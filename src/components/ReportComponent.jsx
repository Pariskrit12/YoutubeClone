import React, { useState } from "react";
import { useReportCommentMutation } from "../api/commentApi";

export default function ReportComponent({ commentId }) {
  const [reason, setReason] = useState("");
  const [reportComment, { isLoading: reportCommentLoading }] =
    useReportCommentMutation();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportComment({ commentId, reason }).unwrap();
      console.log("Successfully reported comment");
    } catch (error) {
      console.log("Error in reporting comment");
    }
  };
  return (
    <div className="absolute inset-0 z-50 bg-gray-900 ml-[5rem]  text-white flex flex-col items-center justify-center w-[40rem] h-[10rem] rounded-2xl ">
      <div className="flex items-center gap-[1rem] mb-[1rem]">
        <label>Reason:</label>
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="p-[1rem] border-[1px] rounded-xl w-[20rem]"
          placeholder="Your reason to report"
        />
      </div>
      <button
        onClick={handleOnSubmit}
        className=" p-[0.5rem] rounded-2xl bg-gray-600 cursor-pointer"
      >
        {reportCommentLoading ? "......" : "Submit"}
      </button>
    </div>
  );
}
