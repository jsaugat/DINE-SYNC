// style={{ gridTemplateColumns: "1fr 1fr 2fr 1.2fr 1fr" }}
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Button } from "@/shadcn/ui/button";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ISOToReadableDate } from "@/utils/isoToReadableDate";
import {
  setOrders,
  deleteOrder as deleteOrderLocally,
} from "@/slices/reservation/ordersSlice";
import {
  useDeleteOrderMutation,
  useGetMyOrdersQuery,
} from "@/slices/api/reservationApiSlice";
import { toast } from "@/shadcn/ui/use-toast";
import { LoaderCircle, Loader, MoveRight } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Orders() {
  const { _id: userId } = useSelector((state) => state.auth.userInfo);
  const theOrders = useSelector((state) => state.orders);
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
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
    console.log("THE_ORDERS: ", theOrders);
  }, [userId, dispatch, myOrders]);

  //! Delete an Order
  const handleCancelOrder = async (orderId) => {
    console.log("cancel order");
    try {
      await deleteOrder({ orderId, userId }).unwrap();
      dispatch(deleteOrderLocally(orderId));
      toast({
        title: "Successfully deleted an order.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    } catch (err) {
      console.log("Error occurred while canceling order:", err);
    }
  };

  return (
    <div className="w-1/2">
      <main className="min-h-[40rem] h-full flex flex-col items-start gap-3 text-[0.9rem]">
        <h3 className="text-3xl my-6 mb-4 text-white">Order History</h3>
        {isLoading ? (
          <section className="h-20 w-full border bg-muted/30 rounded-md flex items-center justify-center">
            <div className="flex items-center gap-2 opacity-60">
              <Loader className="animate-spin size-5" />
              Fetching Orders
            </div>
          </section>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : theOrders.length > 0 ? (
          theOrders.map((order, idx) => (
            <figure
              key={order._id}
              className="relative px-4 py-6 pb-12 min-w-fit bg-gradient-to-br from-cardBlack/20 via-cardBlack/20 to-cardBlack/20 border rounded-3xl backdrop-blur-md"
            >
              <div className="grid grid-cols-5 gap-x-1 text-center">
                <div className="text-left text-googleBlue">Table ID</div>
                <div className="text-left text-googleBlue">Table Size</div>
                <div className="text-left text-googleBlue">Date</div>
                <div className="text-left text-googleBlue">Time</div>
                <div className="text-left text-googleBlue">Duration</div>

                <div className="py-2 px-1 text-left text-2xl flex items-start justify-start">
                  {/* <RoundedNeutralDiv> */}
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-green-500 rounded-full"></div>
                    T-{order.bookingDetails.tableNumber}
                  </div>
                  {/* </RoundedNeutralDiv> */}
                </div>
                <div className="py-2 px-1 text-left">
                  <RoundedNeutralDiv>
                    0{order.bookingDetails.tableCapacity}
                  </RoundedNeutralDiv>
                </div>
                <div className="py-2 px-1 text-left">
                  <RoundedNeutralDiv>
                    {ISOToReadableDate(order.date, "date")}
                  </RoundedNeutralDiv>
                </div>
                <div className="py-2 px-1 text-left">
                  <RoundedNeutralDiv>
                    {ISOToReadableDate(order.date, "time")}
                  </RoundedNeutralDiv>
                </div>
                <div className="py-2 px-1 text-left">
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

              {/* Delete an Order */}
              <DeleteAlertDialog
                orderId={order._id}
                handleCancelOrder={() => handleCancelOrder(order._id)}
                isDeleting={isDeleting}
                trigger={
                  <Button className="absolute right-4 bottom-5 rounded-full text-red-500 bg-red-900/20 hover:bg-red-900/30">
                    Cancel Order
                  </Button>
                }
              />
            </figure>
          ))
        ) : (
          <section className="border rounded-lg p-12 text-muted-foreground bg-muted/50 backdrop-blur-[1px] w-full flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 justify-center">
              <CircleAlert
                strokeWidth={"1.5px"}
                className="text-muted-foreground size-5"
              />{" "}
              <div>Your order history is currently empty.</div>
            </div>
            <Link
              to="/booking"
              className="group underline text-googleBlue flex items-center gap-2"
            >
              Reserve a table
              <MoveRight
                className="size-4 group-hover:translate-x-1.5 transition-transform"
                strokeWidth={"1.5px"}
              />
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

//! Delete Alert Dialog
const DeleteAlertDialog = ({
  trigger,
  orderId,
  handleCancelOrder,
  isDeleting,
}) => (
  <AlertDialog>
    <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete your this order. This action cannot be
          undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="text-red-500 bg-red-900/20 hover:bg-red-900/30"
          onClick={() => handleCancelOrder(orderId)}
        >
          {isDeleting && <Loader className="size-5 animate-spin" />}
          {!isDeleting && <span>Delete</span>}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
