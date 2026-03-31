import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "api/v1/admin/get-all-users",
      providesTags:["Users"]
    }),

    deleteUser: builder.mutation({  
      query: (userId) => ({
        url: `api/v1/admin/deleteUser/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    getReportedVideos: builder.query({
      query: () => "api/v1/videos/reported-videos",
      providesTags: ["ReportedVideos"],
    }),
    deleteVideoByAdmin: builder.mutation({
      query: ({ videoId, channelId }) => ({
        url: `api/v1/admin/delete-video/${videoId}/${channelId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReportedVideos"], // refresh the reported videos list
    }),
  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation,useGetReportedVideosQuery ,useDeleteVideoByAdminMutation} = adminApi;