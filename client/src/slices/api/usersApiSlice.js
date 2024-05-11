import { apiSlice } from "./apiSlice"; // the Parent of slices
import { USERS_URL } from "@/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  // inject endpoints to the apiSlice parent
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        // data is going to be email, pw etc.
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        // data is going to be email, pw etc.
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        // data is going to be email, pw etc.
        url: `${USERS_URL}/profile`,
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
} = usersApiSlice;
