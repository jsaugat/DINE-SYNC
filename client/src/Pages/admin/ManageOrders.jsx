import { Container } from "@/master";
import React, { useEffect } from "react";
import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table"
import { useDeleteOrderByIdMutation, useGetAllOrdersQuery } from "@/slices/api/reservationApiSlice";
import { deleteAdOrder, setAdOrders } from "@/slices/reservation/allOrdersSlice";
import { Loader, Trash2 } from "lucide-react"
import { Button } from "@/shadcn/ui/button";

const OrdersTable = ({ allOrders }) => {
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderByIdMutation();
  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId).unwrap();
    dispatch = (deleteAdOrder(orderId))
  }

  return (
    <Table>
      {/* <TableCaption>A list of recent orders</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Booking Name</TableHead>
          <TableHead className="text-left">Date</TableHead>
          <TableHead className="text-left">Contact</TableHead>
          <TableHead className="text-left">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allOrders.map((order) => (
          <TableRow key={order._id}>
            <TableCell className="font-medium text-left">{order.bookingDetails ? order.bookingDetails.name : "N/A"}</TableCell>
            <TableCell className="text-left">{new Date(order.date).toLocaleDateString()}</TableCell>
            <TableCell className="text-left">{order.bookingDetails ? `${order.bookingDetails.phone}` : "N/A"}</TableCell>
            <TableCell className="text-left">
              <Button size="icon" variant="outline" onClick={() => handleDeleteOrder(order._id)}>
                {isDeleting ? <Loader className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function ManageOrders({ contentWidth }) {
  const allOrders = useSelector((state) => state.allOrders);
  const {
    data: fetchedAllOrders,
    isLoading,
    error,
    refetch,
  } = useGetAllOrdersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
    console.log("***** MANAGE ORDERS_PAGE *****");
    console.log("My Orders: ", allOrders);

    if (fetchedAllOrders) {
      dispatch(setAdOrders(fetchedAllOrders));
    }
    console.log("THE_ORDERS: ", allOrders);
  }, [dispatch, allOrders]);

  return (
    <div className="w-[700px]">
      <main className="min-h-[40rem] h-full flex flex-col items-start gap-3 text-[0.9rem]">
        <h3 className="text-3xl my-6 mb-4 text-white text-left">
          Manage Orders
        </h3>
        {isLoading ? (
          <section className="h-20 w-full border bg-muted/30 rounded-md flex items-center justify-center">
            <div className="flex items-center gap-2 opacity-60">
              <Loader className="animate-spin size-5" />
              Fetching All Orders
            </div>
          </section>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : allOrders ?
          <OrdersTable allOrders={allOrders} />
          : (
            <section className="border rounded-lg p-12 text-muted-foreground bg-muted/50 backdrop-blur-[1px] w-full flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 justify-center">
                <CircleAlert
                  strokeWidth={"1.5px"}
                  className="text-muted-foreground size-5"
                />{" "}
                <div>Zero reservation orders right now</div>
              </div>
              {/* <Link
              to="/booking"
              className="group underline text-googleBlue flex items-center gap-2"
            >
              Reserve a table
              <MoveRight
                className="size-4 group-hover:translate-x-1.5 transition-transform"
                strokeWidth={"1.5px"}
              />
            </Link> */}
            </section>
          )}
      </main>
    </div>
  );
}