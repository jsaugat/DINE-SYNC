import {
  BookingDetails,
  BookingForm,
  Container,
  TablesViewDrawer,
} from "../master";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../Styles/App.scss";
import { Spotlight } from "@/components/ui/Spotlight";
import Tables from "@/components/reservation/tablesList/Tables";
import { DateToUTCDate } from "@/utils/toUTCDate";

function ReservationPage() {
  const [search, setSearch] = useState(false);
  let { date: selectedDate, time: selectedTime } = useSelector(
    (state) => state.selection
  );
  const getFormattedDateTime = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    selectedDate = new Date(selectedDate);
    const formattedDate = `${
      months[selectedDate.getMonth()]
    } ${selectedDate.getDate()} ${selectedDate.getFullYear()}`;

    let hours = parseInt(selectedTime.slice(0, -2));
    const isPM = selectedTime.endsWith("PM");

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }

    const formattedTime = `${hours.toString().padStart(2, "0")}:00`;

    const selectedDateTime = new Date(`${formattedDate} ${formattedTime}`);
    const selectedNepaliDateTime = DateToUTCDate(selectedDateTime);
    console.log("Selected Nepali Date Time: ", selectedNepaliDateTime);
    return selectedNepaliDateTime;
  };
  return (
    <Container className="relative">
      <section>
        <h3 className="text-4xl my-10 mt-16 bg-gradient-to-br from-white via-white to-onyx bg-clip-text text-transparent font-medium">
          Make a Reservation
        </h3>
        {/* <section className="p-3 text-left text-sm rounded-full border w-fit mx-auto mb-6 text-teal-200">
          Please refine your selection using the form on the left to display the
          corresponding tables on the right.
        </section> */}
        <section className="flex justify-center items-start gap-10 mb-12 relative z-30">
          <BookingForm setSearch={setSearch} />
          <Tables search={search} getFormattedDateTime={getFormattedDateTime} />
        </section>
        <Spotlight
          className="-top-40 left-0 md:left-96 md:-top-20 md:h-[200%] -z-20"
          fill="#008a8c"
        />
      </section>
      {/* BOOKING DETAILS Form */}
      <BookingDetails getFormattedDateTime={getFormattedDateTime} />
      {/* DRAWER TRIGGER */}
    </Container>
  );
}
export default ReservationPage;

/**
 * RESERVATION Page
    |-- section I
    |   |-- BOOKING FORM
    |   |-- TABLES
    |-- section II
    |   |-- BOOKING DETAILS
 */
