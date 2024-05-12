import { apiSlice } from "./apiSlice"; // the Parent of slices
const AUTH_URL = "/auth";

export const authApiSlice = apiSlice.injectEndpoints({
  // inject endpoints to the apiSlice parent
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        // data is going to be email, pw etc.
        url: `${AUTH_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        // data is going to be email, pw etc.
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        // data is going to be email, pw etc.
        url: `${AUTH_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
} = authApiSlice;
