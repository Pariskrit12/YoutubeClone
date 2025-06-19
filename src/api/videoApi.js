import { baseApi } from "./baseApi";

export const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: () => "api/v1/videos/get-all-video",
    }),
    getLikedVideo: builder.query({
      query: () => "api/v1/videos/get-liked-video",
    }),
    getSubscribedChannelOfUser: builder.query({
      query: () => `api/v1/channels/subscribed-channel`,
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
    getChannelVideo: builder.query({
      query: (channelId) => `/api/v1/channels/get-channel-video/${channelId}`,
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
     suggestedVideos:builder.query({
        query:(videoId)=>`api/v1/videos/suggest-video/${videoId}`
      }),
  }),
});
export const {
  useGetAllVideosQuery,
  useGetLikedVideoQuery,
  useGetSubscribedChannelOfUserQuery,
  useGetPopularVideosQuery,
  useGetWatchedVideoQuery,
  useGetTrendingVideoQuery,
  useGetChannelVideoQuery,
  useGetSavedVideoQuery,
  useGetVideoInfoQuery,
  useSearchVideosQuery,
  useSuggestedVideosQuery
} = videoApi;
