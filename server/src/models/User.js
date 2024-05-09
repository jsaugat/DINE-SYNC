import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Reservation from "./Reservation.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  { timestamps: true }
);

//? Hash password before saving to database (each time when "password" field is modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

//? 'passwordMatches' is a custom instance method, it can be used in login/auth.controller as 'foundUser.passwordMatches(req.body.password)'
userSchema.methods.passwordMatches = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//? Define middleware to update user's reservations after a reservation is made
userSchema.post("save", async function (doc, next) {
  try {
    const reservations = await Reservation.find({ userId: doc._id });
    doc.reservations = reservations;
    doc.save();
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
