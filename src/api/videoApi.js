import { baseApi } from "./baseApi";

export const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: () => "api/v1/videos/get-all-video",
    }),
    getLikedVideo: builder.query({
      query: () => "api/v1/videos/get-liked-video",
      providesTags:["video"]
    }),

    getPopularVideos: builder.query({
      query: () => "api/v1/videos/get-popular-video",
    }),
    getWatchedVideo: builder.query({
      query: () => "/api/v1/videos/get-watched-video",
    }),
    getTrendingVideo: builder.query({
      query: () => "/api/v1/videos/get-trending-video",
    }),

    getSavedVideo: builder.query({
      query: () => "/api/v1/videos/get-saved-video",
    }),
    getVideoInfo: builder.query({
      query: (videoId) => `/api/v1/videos/get-info-video/${videoId}`,
    }),
    searchVideos: builder.query({
      query: (searchTerms) => ({
        url: "/api/v1/videos/search-video",
        params: { query: searchTerms },
      }),
    }),
    suggestedVideos: builder.query({
      query: (videoId) => `api/v1/videos/suggest-video/${videoId}`,
    }),

    saveVideo: builder.mutation({
      query: (videoId) => ({
        url: `api/v1/videos/save-video/${videoId}`,
        method: "POST",
      }),
    }),
    unSaveVideo: builder.mutation({
      query: (videoId) => ({
        url: `api/v1/videos/unsave-video/${videoId}`,
        method: "POST",
      }),
    }),
    postVideo: builder.mutation({
      query: ({ channelId, formData }) => ({
        url: `api/v1/videos/upload-video/${channelId}`,
        method: "POST",
        body: formData,
      }),
    }),
    updateVideoTitleOrDescription: builder.mutation({
      query: ({ videoId, ...updates }) => ({
        url: `api/v1/videos/update-video-info/${videoId}`,
        method: "PUT",
        body: updates,
      }),
    }),
    updateVideoThumbnail: builder.mutation({
      query: ({ videoId, formData }) => ({
        url: `api/v1/videos/update-video-thumbnail/${videoId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteVideo: builder.mutation({
      query: ({ videoId, channelId }) => ({
        url: `api/v1/videos/delete-video/${videoId}/${channelId}`,
        method: "DELETE",
      }),
    }),
    likeVideo: builder.mutation({
      query: (videoId) => ({
        url: `api/v1/likes/like-video/${videoId}`,
        method: "POST",
      }),
      invalidatesTags:["video"]
    }),
    dislikeVideo: builder.mutation({
      query: (videoId) => ({
        url: `api/v1/likes/dislike-video/${videoId}`,
        method: "POST",
      }),
    }),
  }),
});
export const {
  useGetAllVideosQuery,
  useGetLikedVideoQuery,
  useGetPopularVideosQuery,
  useGetWatchedVideoQuery,
  useGetTrendingVideoQuery,
  useGetSavedVideoQuery,
  useGetVideoInfoQuery,
  useSearchVideosQuery,
  useSuggestedVideosQuery,
  useSaveVideoMutation,
  useUnSaveVideoMutation,
  usePostVideoMutation,
  useUpdateVideoTitleOrDescriptionMutation,
  useUpdateVideoThumbnailMutation,
  useDeleteVideoMutation,
  useLikeVideoMutation,
  useDislikeVideoMutation
} = videoApi;
