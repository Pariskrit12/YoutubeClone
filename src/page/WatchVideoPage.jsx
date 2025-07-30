import {
  faSave,
  faShieldHalved,
  faSort,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatTimeAgo } from "../util/formatTime.js";
import React, { useDebugValue, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SubscribeButton from "../components/SubscribeButton";
import SuggestedVideo from "../components/SuggestedVideo";
import { useAuth } from "../context/AuthContext";
import CommentCard from "../components/CommentCard";
import { useDispatch, useSelector } from "react-redux";
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
import Spinner from "../components/Spinner.jsx";
import {
  useCreateCommentMutation,
  useGetCommentOfVideoQuery,
} from "../api/commentApi.js";
import { useGetChannelInfoQuery } from "../api/channelApi.js";
import { setSubscriptionState } from "../store/slice/toggleSubscription.js";
import { setCommentInteractionState } from "../store/slice/likeComment.js";

export default function WatchVideoPage() {
  const { videoId } = useParams();
  const { data, isLoading } = useGetVideoInfoQuery(videoId);

  const vidData=data?.data?.video;


  
  const videoData = data?.data?.video;
  const isLikedBackend = data?.data?.isLiked;
  const isDislikedBackend = data?.data?.isDisliked;
  const channelId = videoData?.channel?._id;

  const { data: channelData, isLoading: channelInfoLoading } =
    useGetChannelInfoQuery(channelId);

  const isSubscribedBackend = channelData?.data?.isSubscribed;
  const subCountsBackend = channelData?.data?.subCount;

  const [showDescription, setShowDescription] = useState(false);
  const { user, refreshUser } = useAuth();
  const authUser = useSelector((state) => state.auth.user);
  const userId = authUser?.user?._id;

  const userFromAuth = authUser?.user;

  const [content, setContent] = useState("");
  const [fetchedComments, setFetchedComments] = useState([]);
  const dispatch = useDispatch();

  // Sync like/dislike info to Redux from backend (after login / refresh)
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

  // Likes
  const likeCount = useSelector((state) => state.videoInteraction.likeCounts);
  const likeCountOfVideo = likeCount[videoId] || 0;
  const isLiked = useSelector(
    (state) => !!state.videoInteraction.likedVideo[videoId]
  );

  // Dislikes
  const dislikeCount = useSelector(
    (state) => state.videoInteraction.dislikeCounts
  );
  const dislikeCountOfVideo = dislikeCount[videoId] || 0;
  const isDisliked = useSelector(
    (state) => !!state.videoInteraction.dislikedVideo[videoId]
  );

  const subscriberCount = useSelector(
    (state) => state.sub?.subCounts?.[channelId]
  );

  const { data: suggestedVideo, isLoading: suggestedVideoLoading } =
    useSuggestedVideosQuery(videoId);
  const suggestedVideos = suggestedVideo?.data;

  const [saveVideo, { isLoading: saveVideoLoading }] = useSaveVideoMutation();
  const handleOnSave = async () => {
    try {
      await saveVideo(videoId);
      await refreshUser();
    } catch (error) {
      console.log("Failed to save video");
    }
  };

  const alreadySaved = useMemo(() => {
    return user?.savedVideos.some(
      (video) => video._id.toString() === videoId.toString()
    );
  }, [user?.savedVideos, videoId]);

  const [unSaveVideo, { isLoading: unSaveVideoLoading }] =
    useUnSaveVideoMutation();
  const handleOnUnsave = async () => {
    try {
      await unSaveVideo(videoId);
      await refreshUser();
    } catch (error) {
      console.log("Failed to unsave video");
    }
  };

  const [likeVideo, { isLoading: likeVideoLoading }] = useLikeVideoMutation();
  const handleOnLike = async () => {
    dispatch(like(videoId));
    try {
      const res = await likeVideo(videoId).unwrap();
      dispatch(setInteractionState({ videoId, ...res.data }));
    } catch (error) {
      console.log("Error in liking video");
    }
  };

  const [dislikeVideo, { isLoading: dislikeVideoLoading }] =
    useDislikeVideoMutation();
  const handleOnDislike = async () => {
    dispatch(dislike(videoId));
    try {
      const res = await dislikeVideo(videoId).unwrap();
      dispatch(setInteractionState({ videoId, ...res.data }));
    } catch (error) {
      console.log("Error in disliking video");
    }
  };

  const [createComment, { isLoading: commentCreationLoading }] =
    useCreateCommentMutation();
  const createCommentOnClick = async (e) => {
    e.preventDefault();
    try {
      const response = await createComment({ content, videoId }).unwrap();
      setContent("");
      // setFetchedComments((prev) => [response.data, ...prev]);
      setFetchedComments(response.data)
    } catch (error) {
      console.log("Failed to create comment");
    }
  };

  const { data: commentsData, isLoading: commentFetchLoading } =
    useGetCommentOfVideoQuery(videoId);

  const comments = commentsData?.data?.comments;

  //sync redux state with backend when user refresh/login
  useEffect(() => {
    if (Array.isArray(comments)) {
      comments.forEach((comment) => {
        const likes = comment.likes;
        const dislikes = comment.dislikes;
        const commentIsLiked = likes.includes(userId);
        const commentIsDisliked = dislikes.includes(userId);
        const commentLikeCount = likes.length;
        const commentDislikeCount = dislikes.length;
        const commentId = comment._id;

        dispatch(
          setCommentInteractionState({
            commentId,
            isLiked:commentIsLiked,
             isDisliked:commentIsDisliked,
              likeCount:commentLikeCount,
               dislikeCount:commentDislikeCount
            
          })
        );
      });
    }
  },[comments,userId,dispatch]);

  useEffect(() => {
    setFetchedComments(comments);
  }, [comments]);

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full p-[1rem]">
      <div className="flex gap-[1rem]">
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
          <div className="mb-[1rem] text-xl font-semibold">
            {videoData?.title}
          </div>
          <div className="flex justify-between mb-[1rem]">
            <div className="flex w-[18rem] items-center justify-between">
              <div className="flex gap-[5px]">
                <img
                  className="w-12 h-12 rounded-full"
                  src={channelData?.data?.channel?.avatar}
                  alt="avatar"
                />
                <div className="flex flex-col">
                  <Link to={`/channel/${videoData?.channel?._id}`}>
                    <p className="font-semibold cursor-pointer">
                      {videoData?.channel?.channelName}
                    </p>
                  </Link>
                  <p>{subscriberCount} subscribers</p>
                </div>
              </div>
              <div>
                {channelId && <SubscribeButton channelId={channelId} />}
              </div>
            </div>

            <div className="flex gap-[2rem] cursor-pointer text-white">
              <div
                className={`flex items-center gap-[5px] text-xl font-semibold rounded-2xl hover:bg-gray-500 p-[0.5rem] w-auto ${
                  isLiked ? `bg-blue-600` : `bg-gray-700`
                }`}
                onClick={handleOnLike}
              >
                {likeVideoLoading ? (
                  <span>...</span>
                ) : (
                  <>
                    <p>{likeCountOfVideo}</p>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </>
                )}
              </div>

              <div
                className={`flex items-center gap-[5px] text-xl font-semibold rounded-2xl hover:bg-gray-500 p-[0.5rem] w-auto ${
                  isDisliked ? `bg-blue-600` : `bg-gray-700`
                }`}
                onClick={handleOnDislike}
              >
                {dislikeVideoLoading ? (
                  <span>...</span>
                ) : (
                  <>
                    <p>{dislikeCountOfVideo}</p>
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </>
                )}
              </div>

              {alreadySaved ? (
                <div
                  onClick={handleOnUnsave}
                  className="flex text-xl font-semibold rounded-2xl hover:bg-gray-500 p-[1rem] bg-gray-700"
                >
                  {unSaveVideoLoading ? (
                    <Spinner />
                  ) : (
                    <FontAwesomeIcon icon={faShieldHalved} />
                  )}
                </div>
              ) : (
                <div
                  onClick={handleOnSave}
                  className="flex text-xl font-semibold rounded-2xl hover:bg-gray-500 p-[1rem] bg-gray-700"
                >
                  {saveVideoLoading ? (
                    <Spinner />
                  ) : (
                    <FontAwesomeIcon icon={faSave} />
                  )}
                </div>
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
                <p
                  className="font-semibold"
                  onClick={() => setShowDescription(false)}
                >
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

          <div>
            <div className="flex items-center gap-[2rem] mb-[1rem]">
              <p>{videoData?.comments?.length} Comments</p>
              <div className="flex items-center gap-[1rem]">
                <FontAwesomeIcon icon={faSort} />
                Sort By
              </div>
            </div>

            <div className="flex items-center gap-[1rem] mb-[1rem]">
              <img
                className="w-12 h-12 border-[1px] rounded-full"
                src={userFromAuth?.avatar}
                alt="avatar"
              />
              <form onSubmit={createCommentOnClick}>
                <input
                  id="comment"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    commentCreationLoading ? "Loading..." : "Comment"
                  }
                  className="border-b-[1px] w-[45rem] focus:outline-none focus:ring-0"
                />
              </form>
            </div>

            <div>
              {commentFetchLoading ? (
                <Spinner />
              ) : Array.isArray(fetchedComments) &&
                fetchedComments.length > 0 ? (
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
        </div>

        <div className="border-[1px] rounded-2xl w-[25rem] p-[1rem] bg-gray-900 h-auto">
          {suggestedVideoLoading ? (
            <Spinner />
          ) : (
            suggestedVideos.map((video) => (
              <SuggestedVideo key={video._id} video={video} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
