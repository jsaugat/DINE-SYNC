import { apiSlice } from "./apiSlice"; // the Parent of slices
const BASE_URL = "/reservation";

export const ReservationApiSlice = apiSlice.injectEndpoints({
  // inject endpoints to the apiSlice parent
  endpoints: (builder) => ({
    //? GET Orders
    getMyOrders: builder.query({
      query: (userId) => `${BASE_URL}/myorders?userId=${userId}`,
      providesTags: ["Order"],
    }),

    //? CREATE Order
    createOrder: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `${BASE_URL}?userId=${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    //! DELETE a Order
    deleteOrder: builder.mutation({
      query({ orderId, userId }) {
        return {
          url: `${BASE_URL}/myorders/${orderId}?userId=${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
} = ReservationApiSlice;
