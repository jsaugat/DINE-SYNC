import { Container } from "@/master";
import React from "react";
import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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

const OrdersTable = () => {
  const isAvailable = false;
  return (
    <Table>
      {/* <TableCaption>A list of recent orders</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User</TableHead>
          <TableHead className="w-[100px]">Booking Name</TableHead>
          <TableHead className="text-left">Date</TableHead>
          <TableHead className="text-left">Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium text-left">Saugat Joshi</TableCell>
          <TableCell className="font-medium text-left">Saugat Joshi</TableCell>
          <TableCell className="text-left">20 May 2020</TableCell>
          <TableCell className="text-left">
            {isAvailable ? (
              <div
                className={`${styles.available} ${styles.statusIndicator}`}
              >
                <span class="rounded-full size-2 bg-green-500 shadow-md shadow-black"></span>{" "}
                AVAILABLE
              </div>
            ) : (
              <div
                className={`${styles.booked} ${styles.statusIndicator}`}
              >
                <span class="rounded-full size-2 bg-red-600 shadow-sm shadow-black"></span>{" "}
                BOOKED
              </div>
            )}
          </TableCell>
          <TableCell className="text-right">$ 250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default function ManageOrders({ contentWidth }) {
  const orders = useSelector((state) => state.orders);
  const isLoading = false;
  const error = false;
  return (
    <div className="w-[700px]">
      <main className="min-h-[40rem] h-full flex flex-col items-start gap-3 text-[0.9rem]">
        <h3 className="text-3xl my-6 mb-4 text-white text-left">
          Manage Orders
        </h3>
        {isLoading ? (
          <div className="flex items-center gap-2 opacity-60">
            <Loader className="animate-spin size-5" />
            Fetching Orders
          </div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : orders ? (
          <>
            <OrdersTable />
          </>
        ) : (
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