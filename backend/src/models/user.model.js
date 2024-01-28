import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"; // to hash passwords in db to prevent loss if data breach.
import validator from "validator";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String, // encrypted String to prevent leaking // todo: encryption without issues
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//? static signup method, use it as User.sigup() - signup validator
userSchema.statics.signup = async function (email, password) {
  //! VALIDATION
  if (!email || !password) {
    throw Error("All fields must be filled!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  // check if the email exists already
  const exists = await this.findOne({ email }); // this references the model, "User", here.
  if (exists) {
    throw Error("Email already in use");
  }
  // no access of 'res' here so used Error instead
  const salt = await bcrypt.genSalt(10); // 10 - no. of rounds/ cost of salt
  const hash = await bcrypt.hash(password, salt);
  // -> create document in db
  const user = await this.create({ email, password: hash });
  return user;
};

const User = model("User", userSchema);

export { User };
