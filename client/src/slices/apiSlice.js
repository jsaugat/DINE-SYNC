/**
 * @apiSlice : parent to any other api slices like usersApiSlice, productsApiSlice, etc.
    - requests won't be from this file
    -   
    - to handle async requests
 * Implements Thunk Middleware with abstraction?
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:6900/api" }); // it's empty cause we used proxy in vite.config.js

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"], // caching
  endpoints: (builder) => ({}),
  // builder = an object that allows you to define various aspects of your API like queries, mutations etc.
  // all other api slices will have their own endpoints
});
