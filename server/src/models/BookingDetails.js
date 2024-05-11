import mongoose from "mongoose";

export const bookingDetailsSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    tableNumber: { type: Number, required: false },
    tableCapacity: { type: Number, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("BookingDetails", bookingDetailsSchema);
