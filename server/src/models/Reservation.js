import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookingDetails",
      required: true,
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    date: Date,
    time: String,
    // Add any additional fields you need for the reservation
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
