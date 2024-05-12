import "../Styles/App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import PersonalInfo from "../components/PersonalInfo";
import Orders from "../components/Orders";
import { Container } from "@/master";
import { cn } from "@/utils/cn";
import { Package } from "lucide-react";

export default function Profile() {
  return (
    <Container className={"h-fit"}>
      <main className="mb-10 flex justify-center items-start gap-12 h-fit ">
        {/* Left Nav Box */}
        <nav className="flex flex-col items-start">
          <h3 className="text-3xl my-6">Account</h3>
          <ul className="profile-nav w-[300px] text-base space-y-2 grid grid-col-1">
            {/* <NavLink
              to={"/profile/personal-info"}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Personal Information
            </NavLink> */}
            <NavLink
              to={"/profile/orders"}
              className={cn(
                ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "",
                "flex items-center gap-3"
              )}
            >
              <Package className="size-[1.15rem]" strokeWidth="1.5px"></Package> My
              Orders
            </NavLink>
          </ul>
        </nav>

        {/* Right Side Content */}
        <Routes>
          {/* <Route path="/personal-info" element={<PersonalInfo />} /> */}
          <Route path="/orders" element={<Orders />} />
        </Routes>
        {/* <div>d</div> */}
      </main>
    </Container>
  );
}
