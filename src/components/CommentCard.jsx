import {
  faCaretDown,
  faEdit,
  faFlag,
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { dislikeComment, likeComment } from "../store/slice/likeComment";

export default function CommentCard({ comment, setComments, comments }) {
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const liked = useSelector(
    (state) => state.myCommentState.likedComments[comment?._id]
  );
  const disliked = useSelector(
    (state) => state.myCommentState.dislikedComments[comment?._id]
  );
  const likeCount = useSelector(
    (state) => state.myCommentState.likeCounts[comment?._id]
  );
  const dislikeCount = useSelector(
    (state) => state.myCommentState.dislikeCounts[comment?._id]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleOnLike = async () => {
    dispatch(likeComment(comment?._id));
  };

  const handleOnDislike = async () => {
    dispatch(dislikeComment(comment?._id));
  };

  const deleteComment = async () => {
    try {
      await axios.delete(
        `/api/v1/comments/delete-comment/${comment?.videoId}/${comment?._id}`
      );
      setComments(comments.filter((c) => c._id !== comment._id));
    } catch (error) {
      console.log("Failed to delete", error);
    }
  };
  const { user } = useAuth();
  const createdAt = new Date(comment?.createdAt);
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
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="border-b-1 p-[5px]  mb-[1rem] border-gray-400 max-h-[20rem]">
      <div className="flex  gap-[1rem]">
        <img
          className="w-12 h-12 border-[1px] rounded-full"
          src={comment?.authorId?.avatar}
          alt="Rounded avatar"
        ></img>
        <div className=" w-[50rem] ">
          <div className="flex items-center gap-[1rem] mb-[0.5rem]">
            <p className="font-semibold">{comment?.authorId?.username}</p>
            <p>{timeAgo}</p>
          </div>
          <div className="mb-[0.5rem]">
            <p>{comment?.content}</p>
          </div>
          <div className="flex items-center gap-[2rem]  text-xl">
            <div
              onClick={handleOnLike}
              className={`flex items-center rounded-2xl justify-center gap-[2px] w-[4rem] p-[3px] ${
                liked ? `bg-blue-600` : `bg-gray-200`
              }`}
            >
              <p>{likeCount}</p>
              <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            <div
              onClick={handleOnDislike}
              className={`flex items-center rounded-2xl justify-center gap-[2px] w-[4rem] p-[3px] ${
                disliked ? `bg-blue-600` : `bg-gray-200`
              }`}
            >
              <p>{dislikeCount}</p>
              <FontAwesomeIcon icon={faThumbsDown} />
            </div>
          </div>
        </div>
        <div>
          <FontAwesomeIcon
            className="cursor-pointer text-xl"
            icon={faCaretDown}
            onClick={() => setShowDropdown(true)}
          />
        </div>
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute bg-gray-900 left-[48.5rem] mt-[1rem] h-auto w-[8rem] rounded-2xl p-[10px] text-white"
          >
            {user?._id === comment?.authorId?._id ? (
              <div className="flex flex-col ml-[0.2rem] ">
                <div
                  className="flex items-center justify-evenly hover:bg-gray-700 rounded-xl cursor-pointer "
                  onClick={deleteComment}
                >
                  <p>Delete</p>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                <div className="flex items-center justify-evenly hover:bg-gray-700 rounded-xl cursor-pointer">
                  <p>Edit</p>
                  <FontAwesomeIcon icon={faEdit} />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-evenly hover:bg-gray-700 rounded-xl cursor-pointer">
                  <p>Report</p>
                  <FontAwesomeIcon icon={faFlag} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
