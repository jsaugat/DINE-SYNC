import { BookingForm, Container } from "../master";
import React, { useReducer, useState } from "react";
// import Calendar from "../components/ReactCalendar/index.jsx";
import styled from "styled-components";
import "../Styles/App.scss";
import { Button } from "../components/ui/moving-border";
import { Spotlight } from "@/components/ui/Spotlight";
import Tables from "@/components/Tables";

// import reactElementToJSXString from "react-element-to-jsx-string";
// import { toast, Toaster } from "sonner";
// import { ButtonsCard } from "@/components/ui/tailwindcss-buttons";

// submit button animation
const StyledBookButton = styled.button`
  position: relative;
  z-index: 0;
  overflow: hidden;
  transition: all 0.2s ease-out;
  border-radius: 50px;
  padding: 1rem 2rem;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%;
    border-radius: 50px;
    background-color: #f1f1f1;
    transition: all 0.2s ease-out;
  }

  &:hover {
    color: black;
    &::after {
      height: 100%;
    }
  }
`;

// Step 2: Change availableTimes to a reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return initializeTimes(); // Update based on the selected date in the future
    default:
      return state;
  }
};
function ReservationPage() {
  const [availableTimes, dispatch] = useReducer(reducer, []);

  // Step 2: Create updateTimes and initializeTimes functions
  const updateTimes = (date) => {
    dispatch({ type: "UPDATE_TIMES", payload: date });
  };

  // For now, return the same available times regardless of the date
  const initializeTimes = () => [
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  return (
    <Container className="relative">
      <Spotlight
        className="-top-40 left-0 md:left-96 md:-top-20 md:h-[200%] -z-20"
        fill="#008a8c"
        // fill="AquaMarine"
      />

      <h3 className="text-4xl my-10 mt-16 text-white">Make a Reservation</h3>
      <main className="flex justify-center items-center gap-10 mb-12 relative z-30">
        {/* <Calendar /> */}
        <BookingForm
          availableTimes={availableTimes}
          updateTimes={updateTimes}
        />
        <Tables />
      </main>
      {/* submit btn */}
      {/* <StyledBookButton
        type="submit"
        className="border border-white/60 mb-20 mt-11 py-2 px-3 w-fit mx-auto text-xl font-medium"
      >
        Confirm Reservation
      </StyledBookButton> */}
      {/* <Button
        borderRadius="10rem"
        className={
          "text-[1.1rem] bg-black/20 hover:bg-gradient-to-bl hover:from-neutral-800 hover:to-black transition-all ease-in-out delay-150 border-onyx"
        }
      >
        Confirm Reservation
      </Button> */}
      <button className="animate-shimmer h-14 px-6 py-4 border border-onyx bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-white transition-colors hover:shadow-[0_0_10px_2px] hover:shadow-slate-800 hover:border-slate-500 focus:outline-none focus:border focus:border-slate-500 inline-flex  items-center justify-center rounded-full">
        Confirm Reservation
      </button>
    </Container>
  );
}

export default ReservationPage;
