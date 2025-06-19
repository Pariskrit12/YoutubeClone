import {
  faSave,
  faSort,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubscribeButton from "../components/SubscribeButton";
import SuggestedVideo from "../components/SuggestedVideo";
import { useAuth } from "../context/AuthContext";
import CommentCard from "../components/CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { dislikeVideo, likeVideo } from "../store/slice/likeVideo.js";
import {
  useGetVideoInfoQuery,
  useSuggestedVideosQuery,
} from "../api/videoApi.js";
import Spinner from "../components/Spinner.jsx";

export default function WatchVideoPage() {
  const { videoId } = useParams();

  const [showDescription, setShowDescription] = useState(false);

  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // list of fetched comments
  const dispatch = useDispatch();
  const liked = useSelector((state) => state.likes.likedVideos[videoId]);
  const disliked = useSelector((state) => state.likes.dislikedVideos[videoId]);
  const dislikeCount = useSelector(
    (state) => state.likes.dislikeCounts[videoId]
  );
  const likeCount = useSelector((state) => state.likes.likeCounts[videoId]);

  const { data, isLoading } = useGetVideoInfoQuery(videoId);
  const videos = data?.data;
  const channelId = videos?.channel?._id;

  const { data: suggestedVideo, isLoading: suggestedVideoLoading } =
    useSuggestedVideosQuery(videoId);
  const suggestedVideos = suggestedVideo?.data;

  const createdAt = new Date(videos?.createdAt);
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

  const handleOnLike = () => {
    dispatch(likeVideo(videoId));
  };

  const handleOnDislike = async () => {
    dispatch(dislikeVideo(videoId));
  };

  const handleOnSave = async () => {
    const response = await axios.post(
      `/api/v1/videos/save-video/${videoId}`,
      {},
      { withCredentials: true }
    );
    console.log(response.data);
  };

  const createComment = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("comment", comment);
      await axios.post(
        `/api/v1/comments/create-comment/${videoId}`,
        { content: comment },
        { withCredentials: true }
      );

      setComment("");
    } catch (error) {
      console.log("Failed to create comment", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `/api/v1/comments/get-comment-video/${videoId}`,
          { withCredentials: true }
        );
        setComments(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log("Failed to fetch comments", error);
      }
    };
    fetchComments();
  }, [videoId]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full  p-[1rem]">
      <div className="flex gap-[1rem]">
        <div className="  w-[50rem] flex flex-col ">
          <div className="border-[1px] rounded-2xl h-[25rem] mb-[10px]"></div>
          <div className="mb-[1rem] text-xl font-semibold">{videos?.title}</div>
          <div className="flex justify-between mb-[1rem]">
            <div className="flex  w-[18rem] items-center justify-between ">
              <div className="flex gap-[5px]">
                <img
                  className="w-12 h-12 rounded-full"
                  src={videos?.channel?.avatar}
                  alt="Rounded avatar"
                ></img>
                <div className="flex flex-col">
                  <p className="font-semibold">
                    {videos?.channel?.channelName}
                  </p>
                  <p>{videos?.channel?.subscribers.length} subscribers</p>
                </div>
              </div>
              <div>
                {channelId && <SubscribeButton channelId={channelId} />}
              </div>
            </div>

            <div className="flex  gap-[2rem] cursor-pointer text-white">
              <div
                className={`flex items-center gap-[5px] text-xl font-semibold  rounded-2xl hover:bg-gray-500 p-[0.5rem] w-auto ${
                  liked ? `bg-blue-600` : ` bg-gray-700 `
                } justify-between`}
                onClick={handleOnLike}
              >
                <p>{likeCount}</p>
                <FontAwesomeIcon icon={faThumbsUp} />
              </div>
              <div
                className={`flex items-center gap-[5px]  text-xl font-semibold  rounded-2xl hover:bg-gray-500 p-[0.5rem] w-auto   justify-between ${
                  disliked ? `bg-blue-600` : `bg-gray-700`
                }`}
                onClick={handleOnDislike}
              >
                <p>{dislikeCount}</p>
                <FontAwesomeIcon icon={faThumbsDown} />
              </div>
              <div
                onClick={handleOnSave}
                className="flex text-xl font-semibold   rounded-2xl hover:bg-gray-500 p-[1rem]   bg-gray-700 justify-between"
              >
                <FontAwesomeIcon icon={faSave} />
              </div>
            </div>
          </div>
          <div className=" h-auto rounded-2xl bg-gray-200 p-[1rem] cursor-pointer mb-[2rem]">
            <div className="flex items-center gap-[1rem] font-semibold text-xl">
              <p>{videos?.views} views</p>
              <p>{timeAgo}</p>
            </div>
            {showDescription ? (
              <>
                <div>{videos.description}</div>
                <p
                  className="font-semibold"
                  onClick={() => setShowDescription(false)}
                >
                  Show Less
                </p>
              </>
            ) : (
              <div onClick={() => setShowDescription(true)}>
                {videos?.description?.length > 20
                  ? videos.description.slice(0, 20) + " ..See More"
                  : videos.description}
              </div>
            )}
          </div>
          <div className="">
            <div className="flex items-center gap-[2rem] mb-[1rem]">
              <p>{videos?.comments?.length} Comments</p>
              <div className="flex items-center gap-[1rem]">
                <FontAwesomeIcon icon={faSort} />
                Sort By
              </div>
            </div>
            <div className="flex items-center gap-[1rem] mb-[1rem]">
              <img
                className="w-12 h-12 border-[1px] rounded-full"
                src={user?.avatar}
                alt="Rounded avatar"
              ></img>
              <form onSubmit={createComment}>
                <div>
                  <input
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment"
                    className="border-b-[1px] w-[45rem] focus:outline-none focus:ring-0"
                  />
                </div>
              </form>
            </div>
            {comments.length > 0 ? (
              <div className="  ">
                {comments.map((comment) => (
                  <CommentCard
                    comment={comment}
                    key={comment._id}
                    setComments={setComments}
                    comments={comments}
                  />
                ))}
              </div>
            ) : (
              <div className=" flex justify-center items-center h-[5rem] text-2xl font-semibold">
                <p>No comments</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-[1px] rounded-2xl w-[25rem] p-[1rem] bg-gray-900 h-auto ">
          {suggestedVideoLoading ? (
            <Spinner />
          ) : (
            suggestedVideos.map((video) => (
              <SuggestedVideo video={video} key={video._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
