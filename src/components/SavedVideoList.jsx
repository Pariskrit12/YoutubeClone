import React from "react";

export default function SavedVideoList({ video }) {
  const createdAt = new Date(video.createdAt);
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
  }
  return (
    <div>
      <div className="xl:w-[20rem] md:w-[14rem] w-[15rem] p-[1rem] ml-[2rem]  mt-[2rem]  rounded-xl border-gray-600">
        <div className="font-semibold">
          <img
            className="rounded-xl mb-0.5 h-[13rem] w-[25rem] border-[1px] "
            src={video.thumbnail}
          />
          <div className="flex items-center gap-[0.5rem]">
            <div className="flex flex-col  mr-[40px]">
              <div className=" gap-1">
                <p>{video.title}</p>
              </div>
              <div className="flex  gap-[1rem]">
                <p>{video.views} views</p>
                <p>{timeAgo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
