import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "/src/master";
import { Button } from "@/shadcn/ui/button";
import { useToast } from "@/shadcn/ui/use-toast";
import { useSelector, useDispatch } from "react-redux";
import AccountDropdown from "./AccountDropdown";

const NavBar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleOrdersNavigation = () => {
    if (userInfo) {
      navigate("/profile/orders");
    } else {
      toast({
        variant: "minimal",
        title: "Please Login to check your orders.",
        // description: "Friday, February 10, 2023 at 5:57 PM",
      });
      navigate("/login");
    }
  };

  return (
    <nav className="fixed z-[1000] w-full top-0 nav-menu flex px-[5rem] justify-between items-center py-[.6rem] border-b border-white/10 bg-gradient-to-r from-black/40 to-transparent backdrop-blur-sm">
      {/* logo */}
      <Logo />
      {/* menu */}
      <ul className="Navbar flex gap-6 items-center text-[0.9rem] font-light md:mr-auto md:ml-8 md:py-1 md:pl-8 md:border-l md:border-gray-700">
        <li>
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive ? "text-white" : "text-neutral-400"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-neutral-400"
            }
          >
            About us
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="menu"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-neutral-400"
            }
          >
            The Menu
          </NavLink>
        </li> */}
        {!userInfo?.isAdmin && (
          <>
            <li>
              <NavLink
                to="booking"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-neutral-400"
                }
              >
                Reservation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="profile/orders"
                onClick={handleOrdersNavigation}
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-neutral-400"
                }
              >
                My Orders
              </NavLink>
            </li>
          </>
        )}
        {userInfo?.isAdmin && (
          <li>
            <NavLink
              to="admin/orders"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-neutral-400"
              }
            >
              Dashboard
            </NavLink>
          </li>
        )}
      </ul>
      {/* account info */}
      <section>
        {userInfo ? (
          //? LOGGED IN State
          <AccountDropdown userInfo={userInfo} dispatch={dispatch} />
        ) : (
          //? LOGGED OUT State
          <div className="space-x-4">
            <NavLink to={"login"}>
              <Button variant="outline">Log In</Button>
            </NavLink>
            <NavLink to={"signup"}>
              <Button variant="">Sign Up</Button>
            </NavLink>
          </div>
        )}
      </section>
    </nav>
  );
};

export default NavBar;
