import { Container } from "@/master";
import React from "react";
import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function ManageOrders({ contentWidth }) {
  const orders = false;
  const isLoading = false;
  const error = false;
  return (
    <div className={`${contentWidth}`}>
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
          <>Orders</>
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
