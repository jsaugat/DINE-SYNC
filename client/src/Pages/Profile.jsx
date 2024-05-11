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

export default function Profile() {
  return (
    <Container className={"h-fit"}>
      <main className="flex justify-center items-start mb-[8.5rem] gap-12 h-full">
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
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
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
