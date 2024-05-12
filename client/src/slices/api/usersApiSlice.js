import { apiSlice } from "./apiSlice"; // the Parent of slices
const USERS_URL = "/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //? GET Users
    getUsers: builder.query({
      query: (isAdmin) => `${USERS_URL}?isAdmin=${isAdmin}`,
    }),
    //! DELETE a User
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = usersApiSlice;
