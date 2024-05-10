import mongoose from "mongoose";

export const bookingDetailsSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
  },
  { timestamps: true }
);

export default mongoose.model("BookingDetails", bookingDetailsSchema);
