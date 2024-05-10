import { apiSlice } from "./apiSlice"; // the Parent of slices
const BASE_URL = "/reservation";

export const reservationApiSlice = apiSlice.injectEndpoints({
  // inject endpoints to the apiSlice parent
  endpoints: (builder) => ({
    deleteReservation: builder.mutation({
      query: (reservationId) => ({
        url: `${BASE_URL}/myorders?reservationId=${reservationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteReservationMutation } = reservationApiSlice;
