
import { baseApi } from "./baseApi.js";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ content, videoId }) => ({
        url: `/api/v1/comments/create-comment/${videoId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags:["comments"]
    }),
    getCommentOfVideo: builder.query({
      query: (videoId) => `api/v1/comments/get-comment-video/${videoId}`,
      providesTags:["comments"]
    }),
    like: builder.mutation({
      query: (commentId) => ({
        url: `api/v1/likes/like-comment/${commentId}`,
        method: "POST",
      }),
    }),
    dislike: builder.mutation({
      query: (commentId) => ({
        url: `api/v1/likes/dislike-comment/${commentId}`,
        method: "POST",
      }),
    }),
    reportComment: builder.mutation({
      query: ({ commentId, reason }) => ({
        url: `api/v1/comments/report-comment/${commentId}`,
        method: "POST",
        body: { reason },
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentOfVideoQuery,
  useLikeMutation,
  useDislikeMutation,
  useReportCommentMutation,
} = commentApi;
