import {
  faSave,
  faShieldHalved,
  faSort,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatTimeAgo } from "../util/formatTime.js";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SubscribeButton from "../components/SubscribeButton";
import SuggestedVideo from "../components/SuggestedVideo";
import CommentCard from "../components/CommentCard";
import Spinner from "../components/Spinner.jsx";

import { useSelector, useDispatch } from "react-redux";
import {
  dislike,
  like,
  setInteractionState,
} from "../store/slice/likeVideo.js";
import {
  useDislikeVideoMutation,
  useGetVideoInfoQuery,
  useLikeVideoMutation,
  useSaveVideoMutation,
  useSuggestedVideosQuery,
  useUnSaveVideoMutation,
} from "../api/videoApi.js";
import {
  useCreateCommentMutation,
  useGetCommentOfVideoQuery,
} from "../api/commentApi.js";
import { useGetChannelInfoQuery } from "../api/channelApi.js";
import { setSubscriptionState } from "../store/slice/toggleSubscription.js";
import { setCommentInteractionState } from "../store/slice/likeComment.js";

export default function WatchVideoPage() {
  const { videoId } = useParams();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);
  const userId = authUser?.user?._id;
  const isLoggedIn = !!authUser;

  const [content, setContent] = useState("");
  const [fetchedComments, setFetchedComments] = useState([]);
  const [showDescription, setShowDescription] = useState(false);

  // Fetch video info
  const { data, isLoading } = useGetVideoInfoQuery(videoId);
  const videoData = data?.data?.video;
  const isLikedBackend = data?.data?.isLiked;
  const isDislikedBackend = data?.data?.isDisliked;

  // Fetch channel info
  const channelId = videoData?.channel?._id;
  const { data: channelData } = useGetChannelInfoQuery(channelId, {
    skip: !channelId,
  });
  const isSubscribedBackend = channelData?.data?.isSubscribed;
  const subCountsBackend = channelData?.data?.subCount;

  // Fetch suggested videos
  const { data: suggestedVideo, isLoading: suggestedVideoLoading } =
    useSuggestedVideosQuery(videoId);
  const suggestedVideos = suggestedVideo?.data || [];

  // Fetch comments
  const { data: commentsData, isLoading: commentFetchLoading } =
    useGetCommentOfVideoQuery(videoId);
  const comments = commentsData?.data?.comments || [];

  // Sync like/dislike info to Redux from backend
  useEffect(() => {
    if (videoData && videoId) {
      dispatch(
        setInteractionState({
          videoId,
          isLiked: isLikedBackend,
          isDisliked: isDislikedBackend,
          likeCount: videoData?.likes?.length || 0,
          dislikeCount: videoData?.dislikes?.length || 0,
        })
      );
    }
  }, [videoData, videoId, isLikedBackend, isDislikedBackend, dispatch]);

  // Sync subscription state
  useEffect(() => {
    if (channelData && channelId) {
      dispatch(
        setSubscriptionState({
          channelId,
          isSubscribed: isSubscribedBackend,
          subCount: subCountsBackend,
        })
      );
    }
  }, [channelData, channelId, isSubscribedBackend, subCountsBackend, dispatch]);

  // Sync comment likes/dislikes
  useEffect(() => {
    if (Array.isArray(comments) && isLoggedIn) {
      comments.forEach((comment) => {
        const commentIsLiked = comment.likes.includes(userId);
        const commentIsDisliked = comment.dislikes.includes(userId);

        dispatch(
          setCommentInteractionState({
            commentId: comment._id,
            isLiked: commentIsLiked,
            isDisliked: commentIsDisliked,
            likeCount: comment.likes.length,
            dislikeCount: comment.dislikes.length,
          })
        );
      });
    }
    setFetchedComments(comments);
  }, [comments, userId, dispatch, isLoggedIn]);

  // Redux selectors for likes/dislikes
  const likeCount = useSelector((state) => state.videoInteraction.likeCounts);
  const dislikeCount = useSelector(
    (state) => state.videoInteraction.dislikeCounts
  );
  const likeCountOfVideo = likeCount[videoId] || 0;
  const dislikeCountOfVideo = dislikeCount[videoId] || 0;

  const isLiked = useSelector(
    (state) => !!state.videoInteraction.likedVideo[videoId]
  );
  const isDisliked = useSelector(
    (state) => !!state.videoInteraction.dislikedVideo[videoId]
  );

  const subscriberCount = useSelector(
    (state) => state.sub?.subCounts?.[channelId]
  );

  // Video mutations
  const [likeVideo] = useLikeVideoMutation();
  const [dislikeVideo] = useDislikeVideoMutation();
  const handleOnLike = async () => {
    if (!isLoggedIn) return;
    dispatch(like(videoId));
    try {
      const res = await likeVideo(videoId).unwrap();
      dispatch(setInteractionState({ videoId, ...res.data }));
    } catch (error) {
      console.log("Error liking video");
    }
  };

  const handleOnDislike = async () => {
    if (!isLoggedIn) return;
    dispatch(dislike(videoId));
    try {
      const res = await dislikeVideo(videoId).unwrap();
      dispatch(setInteractionState({ videoId, ...res.data }));
    } catch (error) {
      console.log("Error disliking video");
    }
  };

  // Save/Unsave video
  const [saveVideo] = useSaveVideoMutation();
  const [unSaveVideo] = useUnSaveVideoMutation();
  const alreadySaved = useMemo(() => {
    return isLoggedIn
      ? authUser?.savedVideos.some(
          (video) => video._id.toString() === videoId.toString()
        )
      : false;
  }, [authUser, videoId, isLoggedIn]);

  const handleOnSave = async () => {
    if (!isLoggedIn) return;
    try {
      await saveVideo(videoId);
    } catch (error) {
      console.log("Failed to save video");
    }
  };

  const handleOnUnsave = async () => {
    if (!isLoggedIn) return;
    try {
      await unSaveVideo(videoId);
    } catch (error) {
      console.log("Failed to unsave video");
    }
  };

  // Create comment
  const [createComment, { isLoading: commentCreationLoading }] =
    useCreateCommentMutation();
  const createCommentOnClick = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !content.trim()) return;
    try {
      const response = await createComment({ content, videoId }).unwrap();
      setContent("");
      setFetchedComments((prev) => [response.data, ...prev]);
    } catch (error) {
      console.log("Failed to create comment");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full p-[1rem]">
      <div className="flex gap-[1rem]">
        {/* Main video */}
        <div className="w-[50rem] flex flex-col">
          <div className="border-[1px] rounded-2xl h-[25rem] mb-[10px]">
            <video
              controls
              className="border-[1px] rounded-2xl h-[25rem] mb-[10px] w-full object-cover"
              src={videoData?.video}
              poster={videoData?.thumbnail}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="mb-[1rem] text-xl font-semibold">{videoData?.title}</div>

          <div className="flex justify-between mb-[1rem]">
            <div className="flex w-[18rem] items-center justify-between">
              <div className="flex gap-[5px]">
                <img
                  className="w-12 h-12 rounded-full"
                  src={channelData?.data?.channel?.avatar || "/defaultAvatar.png"}
                  alt="avatar"
                />
                <div className="flex flex-col">
                  <Link to={`/channel/${videoData?.channel?._id}`}>
                    <p className="font-semibold cursor-pointer">
                      {videoData?.channel?.channelName}
                    </p>
                  </Link>
                  <p>{subscriberCount || 0} subscribers</p>
                </div>
              </div>
              <div>{channelId && isLoggedIn && <SubscribeButton channelId={channelId} />}</div>
            </div>

            <div className="flex gap-[2rem] cursor-pointer text-white">
              {isLoggedIn && (
                <>
                  <div
                    className={`flex items-center gap-[5px] text-xl font-semibold rounded-2xl hover:bg-gray-500 p-[0.5rem] w-auto ${
                      isLiked ? `bg-blue-600` : `bg-gray-700`
                    }`}
                    onClick={handleOnLike}
                  >
                    <p>{likeCountOfVideo}</p>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </div>

                  <div
                    className={`flex items-center gap-[5px] text-xl font-semibold rounded-2xl hover:bg-gray-500 p-[0.5rem] w-auto ${
                      isDisliked ? `bg-blue-600` : `bg-gray-700`
                    }`}
                    onClick={handleOnDislike}
                  >
                    <p>{dislikeCountOfVideo}</p>
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </div>

                  {alreadySaved ? (
                    <div
                      onClick={handleOnUnsave}
                      className="flex text-xl font-semibold rounded-2xl hover:bg-gray-500 p-[1rem] bg-gray-700"
                    >
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </div>
                  ) : (
                    <div
                      onClick={handleOnSave}
                      className="flex text-xl font-semibold rounded-2xl hover:bg-gray-500 p-[1rem] bg-gray-700"
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="h-auto rounded-2xl bg-gray-200 p-[1rem] cursor-pointer mb-[2rem]">
            <div className="flex items-center gap-[1rem] font-semibold text-xl">
              <p>{videoData?.views} views</p>
              <p>{formatTimeAgo(videoData?.createdAt)}</p>
            </div>
            {showDescription ? (
              <>
                <div>{videoData.description}</div>
                <p className="font-semibold" onClick={() => setShowDescription(false)}>
                  Show Less
                </p>
              </>
            ) : (
              <div onClick={() => setShowDescription(true)}>
                {videoData?.description?.length > 20
                  ? videoData?.description?.slice(0, 20) + " ..See More"
                  : videoData?.description}
              </div>
            )}
          </div>

          {/* Comments */}
          {isLoggedIn ? (
            <div>
              <div className="flex items-center gap-[1rem] mb-[1rem]">
                <img
                  className="w-12 h-12 border-[1px] rounded-full"
                  src={authUser?.avatar || "/defaultAvatar.png"}
                  alt="avatar"
                />
                <form onSubmit={createCommentOnClick}>
                  <input
                    id="comment"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={commentCreationLoading ? "Loading..." : "Comment"}
                    className="border-b-[1px] w-[45rem] focus:outline-none focus:ring-0"
                  />
                </form>
              </div>

              <div>
                {commentFetchLoading ? (
                  <Spinner />
                ) : fetchedComments.length > 0 ? (
                  fetchedComments.map((comment) => (
                    <CommentCard
                      key={comment._id}
                      comment={comment}
                      setFetchedComments={setFetchedComments}
                      comments={fetchedComments}
                    />
                  ))
                ) : (
                  <div className="flex justify-center items-center h-[5rem] text-2xl font-semibold">
                    <p>No comments</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 mb-[1rem]">Login to like, comment, or save videos</p>
          )}
        </div>

        {/* Suggested Videos */}
        <div className="border-[1px] rounded-2xl w-[25rem] p-[1rem] bg-gray-900 h-auto">
          {suggestedVideoLoading ? (
            <Spinner />
          ) : (
            suggestedVideos.map((video) => <SuggestedVideo key={video._id} video={video} />)
          )}
        </div>
      </div>
    </div>
  );
}