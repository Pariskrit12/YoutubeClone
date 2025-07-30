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
import {
  dislikeComment,
  likeComment,
  setCommentInteractionState,
} from "../store/slice/likeComment";
import { formatTimeAgo } from "../util/formatTime";
import { useDislikeMutation, useLikeMutation } from "../api/commentApi";
import ReportComponent from "./ReportComponent";
export default function CommentCard({ comment, setFetchedComments, comments }) {
  const [showReport, setShowReport] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();

  const isLiked = useSelector(
    (state) => !!state.commentInterraction.likedComment[comment?._id]
  );

  const isDisliked = useSelector(
    (state) => !!state.commentInterraction.dislikedComment[comment?._id]
  );

  const likeOfComment = useSelector(
    (state) => state.commentInterraction.likedCount[comment?._id] || 0
  );

  const dislikeOfComment = useSelector(
    (state) => state.commentInterraction.dislikedCount[comment?._id] || 0
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
  const commentId = comment?._id;
  const [dislike, { isLoading: dislikeCommentLoading }] = useDislikeMutation();
  const [like, { isLoading: likeCommentLoading }] = useLikeMutation();
  const handleOnLike = async () => {
    dispatch(likeComment(commentId));
    try {
      const res = await like(commentId).unwrap();

      dispatch(setCommentInteractionState({ commentId, ...res.data }));
    } catch (error) {
      console.log("Error in liking comment", error);
    }
  };

  const handleOnDislike = async () => {
    dispatch(dislikeComment(commentId));
    try {
      const res = await dislike(commentId).unwrap();
      dispatch(setCommentInteractionState({ commentId, ...res.data }));
    } catch (error) {
      console.log("Error in dislikng comment");
    }
  };

  const deleteComment = async () => {
    try {
      await axios.delete(
        `/api/v1/comments/delete-comment/${comment?.videoId}/${comment?._id}`
      );
      setFetchedComments(comments.filter((c) => c._id !== comment._id));
    } catch (error) {
      console.log("Failed to delete", error);
    }
  };
  const { user } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
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
              <p>{formatTimeAgo(comment?.createdAt)}</p>
            </div>
            <div className="mb-[0.5rem]">
              <p>{comment?.content}</p>
            </div>
            <div className="flex items-center gap-[2rem]  text-xl">
              <div
                onClick={handleOnLike}
                className={`flex items-center rounded-2xl justify-center gap-[2px] w-[4rem] p-[3px] cursor-pointer ${
                  isLiked ? `bg-blue-600` : `bg-gray-200`
                }`}
              >
                {likeCommentLoading ? (
                  <span>...</span>
                ) : (
                  <>
                    <p>{likeOfComment}</p>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </>
                )}
              </div>
              <div
                onClick={handleOnDislike}
                className={`flex items-center rounded-2xl justify-center gap-[2px] w-[4rem] p-[3px] cursor-pointer ${
                  isDisliked ? `bg-blue-600` : `bg-gray-200`
                }`}
              >
                {dislikeCommentLoading ? (
                  <span>...</span>
                ) : (
                  <>
                    <p>{dislikeOfComment}</p>
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </>
                )}
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
                  <div
                    className="flex items-center justify-evenly hover:bg-gray-700 rounded-xl cursor-pointer "
                    onClick={() => setShowReport(true)}
                  >
                    <p>Report</p>
                    <FontAwesomeIcon icon={faFlag} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {showReport && <ReportComponent commentId={comment?._id} />}
    </div>
  );
}
