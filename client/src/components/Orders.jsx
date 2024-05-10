import { Button } from "@/shadcn/ui/button";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ISOToReadableDate } from "@/utils/isoToReadableDate";
import { setOrders, deleteOrder } from "@/slices/reservation/ordersSlice";
import { useDeleteReservationMutation } from "@/slices/reservationApiSlice";

export default function Orders() {
  const { _id: userId } = useSelector((state) => state.auth.userInfo);
  const myOrders = useSelector((state) => state.orders);
  const [deleteReservation] = useDeleteReservationMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("user Id: ", userId);
    const getMyOrders = async () => {
      const response = await fetch(
        `http://localhost:6900/api/reservation/myorders?userId=${userId}`
      );
      const data = await response.json();
      dispatch(setOrders(data));
      console.log("My Orders: ", data);
    };
    getMyOrders();
  }, [userId, dispatch]);
  console.log("My Tables: ", myOrders);

  const handleCancelOrder = async (reservationId) => {
    console.log("cancel order");
    try {
      await deleteReservation(reservationId).unwrap();
      dispatch(deleteOrder(reservationId));
    } catch (err) {}
  };

  return (
    <div className="w-1/3">
      <main className="h-[60rem] flex flex-col items-start gap-3 text-[0.9rem]">
        <h3 className="text-3xl my-6 mb-4 text-white">Order History</h3>
        {myOrders &&
          myOrders.map((order, idx) => (
            <figure
              key={idx}
              className="relative px-4 py-6 pb-12 min-w-fit bg-gradient-to-br from-cardBlack/20 via-cardBlack/20 to-cardBlack/20 border rounded-3xl backdrop-blur-md"
            >
              <div
                className="grid grid-cols-5 gap-x-1 text-center"
                style={{ gridTemplateColumns: "1fr 1fr 2fr 1.2fr 1fr" }}
              >
                <div className=" text-googleBlue">Table ID</div>
                <div className=" text-googleBlue">Table Size</div>
                <div className=" text-googleBlue">Date</div>
                <div className=" text-googleBlue">Time</div>
                <div className=" text-googleBlue">Duration</div>

                <div className="py-2 px-1">
                  {/* <RoundedNeutralDiv>T-{order.table.number}</RoundedNeutralDiv> */}
                </div>
                <div className="py-2 px-1">
                  {/* <RoundedNeutralDiv>0{order.table.capacity}</RoundedNeutralDiv> */}
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
                {`Reservation Requested on ${ISOToReadableDate(
                  order.createdAt,
                  "date"
                )}`}
              </span>

              {/* Cancel Reservation */}
              <Button
                className="absolute right-4 bottom-5 rounded-full text-red-500 bg-red-500/10 hover:bg-red-600/20"
                onClick={() => handleCancelOrder(order._id)}
              >
                Cancel Order
              </Button>
            </figure>
          ))}
      </main>
    </div>
  );
}

const RoundedNeutralDiv = ({ children, className }) => {
  return (
    <div
      className={`inline-block px-3 py-1 rounded-full bg-white/10 w-fit border`}
    >
      {children}
    </div>
  );
};
