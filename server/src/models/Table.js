import mongoose from "mongoose";

export const tableSchema = new mongoose.Schema(
  {
    number: Number,
    capacity: Number,
    isAvailable: Boolean,
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: false,
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
