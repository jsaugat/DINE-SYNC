import { Container } from "@/master";
import React from "react";
import { Users, ArrowLeftRight } from "lucide-react";
import { NavLink, Routes, Route } from "react-router-dom";
import ManageUsers from "./ManageUsers";
import ManageOrders from "./ManageOrders";
import { cn } from "@/utils/cn";

export default function Dashboard() {
  return (
    <Container className={"h-fit"}>
      <main className="mb-10 flex justify-center items-start gap-12 h-fit ">
        {/* //? Left Nav Box */}
        <nav className="flex flex-col items-start">
          <h3 className="text-3xl my-6">Dashboard</h3>
          <ul className="profile-nav w-[240px] text-base space-y-2 grid grid-col-1">
            {/* <NavLink
              to={"/admin/users"}
              className={cn(
                ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "",
                "flex items-center gap-3"
              )}
            >
              <Users className="size-[1.15rem]" strokeWidth={"1.5px"} />
              Users
            </NavLink> */}
            <NavLink
              to={"/admin/orders"}
              className={cn(
                ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "",
                "flex items-center gap-3"
              )}
            >
              <ArrowLeftRight
                className="size-[1.15rem]"
                strokeWidth={"1.5px"}
              />
              Orders
            </NavLink>
          </ul>
        </nav>

        {/* //? Right Side Content */}
        <Routes>
          <Route
            path="/orders"
            element={<ManageOrders contentWidth="w-5/12" />}
          />
          <Route
            path="/users"
            element={<ManageUsers contentWidth="w-5/12" />}
          />
        </Routes>
      </main>
    </Container>
  );
}
