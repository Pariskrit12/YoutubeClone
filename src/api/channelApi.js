import { baseApi } from "./baseApi";

export const channelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannelInfo: builder.query({
      query: (channelId) => `api/v1/channels/get-channel-info/${channelId}`,
    }),
    updateChannel: builder.mutation({
      query: ({ channelId, ...updates }) => ({
        url: `api/v1/channels/update-channel/${channelId}`,
        method: "PUT",
        body: updates,
      }),
    }),
    updateChannelAvatar: builder.mutation({
      query: ({ channelId, formData }) => ({
        url: `api/v1/channels/update-channel-avatar/${channelId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    updateChannelBanner: builder.mutation({
      query: ({ channelId, formData }) => ({
        url: `api/v1/channels/update-channel-avatar/${channelId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    deletChannel: builder.mutation({
      query: (channelId) => ({
        url: `/api/v1/channels/delete-channel/${channelId}`,
        method: "DELETE",
      }),
    }),
    getChannelVideo: builder.query({
      query: (channelId) => `/api/v1/channels/get-channel-video/${channelId}`,
    }),
    getSubscribedChannelOfUser: builder.query({
      query: () => `api/v1/channels/subscribed-channel`,
    }),
    createChannel: builder.mutation({
      query: (formData) => ({
        url: "api/v1/channels/create-channel",
        method: "POST",
        body: formData,
      }),
    }),
    subscribeChannel:builder.mutation({
      query:(channelId)=>({
        url:`api/v1/channels/subscribe-channel/${channelId}`,
        method:"PUT"
      })
    }),
    unsubscribeChannel:builder.mutation({
      query:(channelId)=>({
        url:`api/v1/channels/unsubscribe-channel/${channelId}`,
        method:"PUT"
      })
    })
  }),
});

export const {
  useGetChannelInfoQuery,
  useUpdateChannelMutation,
  useUpdateChannelAvatarMutation,
  useUpdateChannelBannerMutation,
  useDeletChannelMutation,
  useGetChannelVideoQuery,
  useGetSubscribedChannelOfUserQuery,
  useCreateChannelMutation,
  useSubscribeChannelMutation,
  useUnsubscribeChannelMutation
} = channelApi;
