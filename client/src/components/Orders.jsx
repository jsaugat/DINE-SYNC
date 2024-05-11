// style={{ gridTemplateColumns: "1fr 1fr 2fr 1.2fr 1fr" }}
import { Button } from "@/shadcn/ui/button";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ISOToReadableDate } from "@/utils/isoToReadableDate";
import {
  setOrders,
  // deleteOrder as deleteOrderLocally,
} from "@/slices/reservation/ordersSlice";
import {
  // useDeleteOrderMutation,
  useGetMyOrdersQuery,
} from "@/slices/api/reservationApiSlice";
import { LoaderCircle, Loader } from "lucide-react";
import { toast } from "@/shadcn/ui/use-toast";
import { CircleAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Orders() {
  const { _id: userId } = useSelector((state) => state.auth.userInfo);
  const theOrders = useSelector((state) => state.orders);
  // const [deleteOrder] = useDeleteOrderMutation();
  const {
    data: myOrders,
    isLoading,
    error,
    refetch,
  } = useGetMyOrdersQuery(userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
    console.log("***** ORDERS_PAGE *****");
    console.log("UserInfo _id: ", userId);
    console.log("My Orders: ", myOrders);

    if (myOrders) {
      dispatch(setOrders(myOrders));
    }
  }, [userId, dispatch, myOrders]);

  const handleCancelOrder = async (reservationId) => {
    console.log("cancel order");
    try {
      // await deleteOrder(reservationId).unwrap();
      // dispatch(deleteOrderLocally(reservationId));
    } catch (err) {
      console.log("Error occurred while canceling order:", err);
    }
  };

  return (
    <div className="w-1/3">
      <main className="h-[60rem] flex flex-col items-start gap-3 text-[0.9rem]">
        <h3 className="text-3xl my-6 mb-4 text-white">Order History</h3>
        {isLoading ? (
          <div className="flex items-center gap-2 opacity-60">
            <Loader className="animate-spin size-5" />
            Fetching Orders
          </div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : theOrders.length > 0 ? (
          theOrders.map((order, idx) => (
            <figure
              key={order._id}
              className="relative px-4 py-6 pb-12 min-w-fit bg-gradient-to-br from-cardBlack/20 via-cardBlack/20 to-cardBlack/20 border rounded-3xl backdrop-blur-md"
            >
              <div className="grid grid-cols-5 gap-x-1 text-center">
                <div className=" text-googleBlue">Table ID</div>
                <div className=" text-googleBlue">Table Size</div>
                <div className=" text-googleBlue">Date</div>
                <div className=" text-googleBlue">Time</div>
                <div className=" text-googleBlue">Duration</div>

                <div className="py-2 px-1">
                  <RoundedNeutralDiv>
                    T-{order.bookingDetails.tableNumber}
                  </RoundedNeutralDiv>
                </div>
                <div className="py-2 px-1">
                  <RoundedNeutralDiv>
                    0{order.bookingDetails.tableCapacity}
                  </RoundedNeutralDiv>
                </div>
                <div className="py-2 px-1">
                  <RoundedNeutralDiv>
                    {ISOToReadableDate(order.date, "date")}
                  </RoundedNeutralDiv>
                </div>
                <div className="py-2 px-1">
                  <RoundedNeutralDiv>
                    {ISOToReadableDate(order.date, "time")}
                  </RoundedNeutralDiv>
                </div>
                <div className="py-2 px-1">
                  <RoundedNeutralDiv>1 hr</RoundedNeutralDiv>
                </div>
              </div>

              <section className="flex gap-4 my-4">
                <h4 className="text-googleBlue ml-2">Booking Details</h4>
                <div className="inline-flex flex-col gap-1">
                  <RoundedNeutralDiv>
                    {order.bookingDetails.name}
                  </RoundedNeutralDiv>
                  <RoundedNeutralDiv>
                    {order.bookingDetails.email}
                  </RoundedNeutralDiv>
                  <RoundedNeutralDiv>
                    {order.bookingDetails.phone}
                  </RoundedNeutralDiv>
                </div>
              </section>

              {/* Reservation Requested */}
              <span className="absolute text-neutral-500 text-[.8rem] font-medium bottom-5 left-4">
                {`Ordered on ${ISOToReadableDate(order.createdAt, "date")}`}
              </span>

              {/* Cancel Reservation */}
              <Button
                className="absolute right-4 bottom-5 rounded-full text-red-500 bg-red-500/10 hover:bg-red-600/20"
                onClick={() => handleCancelOrder(order._id)}
              >
                Cancel Order
              </Button>
            </figure>
          ))
        ) : (
          <section className="border rounded-lg p-12 text-muted-foreground bg-muted/50 ">
            <div className="flex items-center gap-2">
              <CircleAlert
                strokeWidth={"1.5px"}
                className="text-muted-foreground size-5"
              />{" "}
              <div>Your order history is currently empty.</div>
            </div>
            <Link
              to="/booking"
              className="underline text-googleBlue hover:text-googleBlue/70"
            >
              Reserve a table
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}

const RoundedNeutralDiv = ({ children, className }) => {
  return (
    <div
      className={`inline-block px-2 py-0.5 rounded-lg bg-white/10 w-fit border`}
    >
      {children}
    </div>
  );
};
