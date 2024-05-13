import User from "../models/User.js";
import Reservation from "../models/Reservation.js";
import Day from "../models/Day.js";

//? GET
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//? GET ALL
const getUsers = async (_, res, next) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//? UPDATE
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //? returns the modified document rather than the original one
      // By default, 'updatedUser' returns the original document before modifications.
      // A PUT request updates the database without providing the modified document on api endpoint.
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

//? DELETE
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    // If user was found and deleted
    if (deletedUser) {
      // Remove all reservations associated with the deleted user
      await Reservation.deleteMany({ userId: deletedUser._id });

      // Update the associated tables' isAvailable property to true
      const reservations = await Reservation.find({ userId: deletedUser._id });
      for (const reservation of reservations) {
        const day = await Day.findOne({ date: reservation.date });
        if (day) {
          const table = day.tables.find(
            (table) => table._id.toString() === reservation.table.toString()
          );
          if (table) {
            // Set the isAvailable property of the table to true
            table.isAvailable = true;
          }
          await day.save();
        }
      }

      res
        .status(200)
        .json({ "Deleted user and associated reservations": deletedUser });
    } else {
      // If user was not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};
// const deleteUser = async (req, res, next) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.userId);

//     // If user was found and deleted
//     if (deletedUser) {
//       // Remove all reservations associated with the deleted user
//       await Reservation.deleteMany({ userId: deletedUser._id });

//       // Update the associated tables' isAvailable property to true
//       const reservations = await Reservation.find({ userId: deletedUser._id });
//       for (const reservation of reservations) {
//         const day = await Day.findOne({ date: reservation.date });
//         if (day) {
//           const table = day.tables.find(
//             (table) => table._id.toString() === reservation.table.toString()
//           );
//           if (table) {
//             // Set the isAvailable property of the table to true
//             table.isAvailable = true;
//           }
//           await day.save();
//         }
//       }

//       res
//         .status(200)
//         .json({ "Deleted user and associated reservations": deletedUser });
//     } else {
//       // If user was not found
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export default deleteUser;

export { getUser, getUsers, updateUser, deleteUser };
