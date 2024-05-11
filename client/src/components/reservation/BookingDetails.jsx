import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toast } from "@/shadcn/ui/use-toast";
import { Separator } from "@/shadcn/ui/separator";
import Check from "../Check";
import { clearAllSelection } from "@/slices/reservation/selectionSlice";
import { clearAllTables } from "@/slices/reservation/totalTablesSlice";

// redux
import {
  setBookingName,
  setBookingEmail,
  setBookingPhone,
  resetBooking,
} from "@/slices/reservation/bookingDetailsSlice";
// import { useCreateOrderMutation } from "@/slices/api/reservationApiSlice";

function BookingDetails({ getFormattedDateTime }) {
  // const [createOrder, { data, isLoading, error }] = useCreateOrderMutation();
  // RTK slices
  const { name, phone, email } = useSelector((state) => state.bookingDetails);
  const userId = useSelector((state) => state.auth.userInfo._id);
  const {
    table: { number: tableNumber },
    size,
  } = useSelector((state) => state.selection);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("reserdetails: ", tableNumber, size);
  }, []);

  //? MAKE A ORDER REQUEST BY HITTING BACKEND API
  const makeOrderRequest = async () => {
    const incompleteDetails =
      name.length === 0 || phone.length === 0 || email.length === 0;

    if (incompleteDetails) {
      toast({
        variant: "destructive",
        title: "Incomplete Details",
        description: "Please fill in all details.",
        action: <ToastAction altText="Try again">Okay</ToastAction>,
        className: "px-7 py-4",
      });
      return;
    } else {
      // Proceed with reservation.
      const selectedDateTime = getFormattedDateTime(); // Get the combined date and time from user selection.
      try {
        // Send a POST request to reserve the table

        const response = await fetch(
          `http://localhost:6900/api/reservation?userId=${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              phone,
              email,
              date: selectedDateTime,
              table: tableNumber,
              capacity: size,
            }),
          }
        );
        if (response.ok) {
          // If reservation is successful, log the response and update page
          const reservationResponse = await response.text();
          console.log("Reserved: " + reservationResponse);
          //? RESET Filters, Tables and BookingDetails
          dispatch(clearAllSelection());
          dispatch(clearAllTables());
          dispatch(resetBooking());
          //? NAVIGATE to Thanks page
          navigate("/booking/thanks");
        } else {
          // If reservation fails, handle error appropriately
          console.error("Reservation failed:", response.statusText);
        }
      } catch (err) {
        console.error("Reservation error:", err.message);
      }
    }
  };

  return (
    <main className="relative w-[50vw] bg-black py-[3.4rem] rounded-3xl mx-auto border flex justify-around items-center overflow-hidden shadow-[0_0_1rem_1rem] shadow-black/50">
      <div className="absolute pointer-events-none inset-0 bg-gradient-to-bl from-transparent via-transparent to-dineSync/30"></div>
      <section>
        <h3 className="text-left text-4xl bg-gradient-to-br from-white via-white to-onyx bg-clip-text text-transparent font-medium">
          Confirm <br /> Reservation
        </h3>
        <p className="text-neutral-400 text-sm text-left mt-2 leading-[0.9rem]">
          Ensure all information is accurate.
        </p>
      </section>
      <section className="text-left">
        {tableNumber && (
          <div className="mb-7">
            <span className=" my-1 flex items-center gap-2 mx-auto">
              <Check />
              <span>
                Table{" "}
                <span className="text-googleBlue text-xl">T-{tableNumber}</span>{" "}
                is selected.
              </span>
            </span>
            <Separator />
          </div>
        )}
        <Label htmlFor="email">Name</Label>
        <Input
          id="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => dispatch(setBookingName(e.target.value))}
          className="mb-2 mt-1 w-[16rem]"
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setBookingEmail(e.target.value))}
          className="mb-2 mt-1"
        />
        <Label htmlFor="phone">Contact</Label>
        <Input
          type="tel"
          id="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => dispatch(setBookingPhone(e.target.value))}
          className="mb-2 mt-1"
        />
        <button
          type="submit"
          onClick={makeOrderRequest}
          className="animate-shimmer mt-12 h-14 px-6 py-2 border border-onyx bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-white transition-colors hover:shadow-[0_0_10px_2px] hover:shadow-slate-800 hover:border-slate-500 focus:outline-none focus:border focus:border-slate-500 inline-flex  items-center justify-center rounded-full  gap-3"
        >
          <span>Book Now</span>
          <ArrowForwardIcon fontSize="small" />
        </button>
      </section>
    </main>
  );
}

export default BookingDetails;

// const orderData = {
//   name,
//   phone,
//   email,
//   date: selectedDateTime,
//   table: tableNumber,
//   capacity: size,
// };
// const orderResponse = await createOrder(userId, orderData).unwrap();
// console.log("Reserved: " + orderResponse);
// navigate("/booking/thanks");
