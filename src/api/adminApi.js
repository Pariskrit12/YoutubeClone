import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query:()=> "api/v1/admin/get-all-users",
    }),
  }),
});

export const { useGetAllUsersQuery } = adminApi;
