import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalInfo: builder.query({
      query: () => "api/v1/users/get-personal-info",
    }),
    registration: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/users/register",
        method: "POST",
        body: formData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "api/v1/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "api/v1/users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetPersonalInfoQuery,
  useRegistrationMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userApi;
