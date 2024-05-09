import Table from "../models/Table.js";
import Day from "../models/Day.js";
import { allTables } from "../seeds/allTables.js";

// GET Available Tables
// Params for route : { data: String ("Dec 21 2012 09:00") }
const getAvailableTables = async (req, res, next) => {
  console.log("Request attempted");

  try {
    const dateTime = new Date(req.body.date);

    // Find documents with the specified date
    const existingDocs = await Day.find({ date: dateTime });

    if (existingDocs.length) {
      console.log("Record exists. Sent docs.");
      res.status(200).send(existingDocs[0]);
    } else {
      // Create a new document with the searched date and default tables
      const newDay = new Day({ date: dateTime, tables: allTables });
      await newDay.save();
      console.log("Created new datetime. Sent default docs.");

      // Retrieve the newly created document
      const createdDoc = await Day.findOne({ date: dateTime });
      res.status(200).send(createdDoc);
    }
  } catch (err) {
    next(err);
  }
};

// RESERVE
/**
 *  reservation @param { name, phone, email, date, tableNumber, }
 */
const reserveTable = async (req, res, next) => {
  console.log("Reservation Submitted");
  //? request body
  const {
    table: selectedTable,
    date: selectedDateTime,
    name,
    phone,
    email,
  } = req.body;
  //? request query
  const { userId } = req.query;

  try {
    // 1. Find all days matching the requested date:
    const days = await Day.find({ date: selectedDateTime });

    // 2. Check if any day records were found for the requested date:
    if (days.length > 0) {
      const day = days[0]; // Get the first day object

      // 3. Find the requested table within the day's tables:
      /**
       ** req.body.table return a tableNumber ? (it's being compared to t.number)
       *  it's common in web apps to send the unique identifier (ID) of an entity as part of the request body when performing operations like creating, updating, or deleting.
       * customer chooses a table -> sending its id/ number to backend.
       */
      const table = day.tables.find((table) => table.number === selectedTable);

      // 4. Check if the requested table exists within the day:
      if (table) {
        // 5. Table found: Create a new reservation object:
        table.reservation = new Reservation({
          name,
          phone,
          email,
          userId,
        });

        // 6. Mark the table as unavailable:
        table.isAvailable = false;

        // 7. Save the updated day object with the new reservation:
        await day.save();
        console.log("Reserved");
        res.status(200).send("Added Reservation");
      } else {
        console.log("Table not found"); // Log message if table wasn't found
      }
    } else {
      console.log("Day not found"); // Log message if day wasn't found
    }
  } catch (err) {
    // 8. Catch any potential errors during the process:
    next(err); // Pass the error to the next error handler
  }
};

// GET My Orders
const getMyOrders = async (req, res, next) => {
  try {
    const days = await Day.find({});
    const reservedTables = [];
    // Iterate over each day
    days.forEach((day) => {
      // Iterate over each table in the day
      day.tables.forEach((table) => {
        //? Check if the table is reserved by the logged in user , whose id is passed as query.
        if (
          table.reservation &&
          table.reservation.userId === req.query.userId
        ) {
          const { name, phone, email } = table.reservation;
          reservedTables.push({
            reservedDate: day.date, // date and time the table is reserved for
            number: table.number, // the table
            capacity: table.capacity, // the table capacity
            id: table.id, // the table id
            createdDate: table.createdAt,
            // table.reservation properties
            bookerName: name,
            bookerPhone: phone,
            bookerEmail: email,
          });
        }
      });
    });
    console.log(reservedTables);
    res.status(200).json(reservedTables);
  } catch (err) {
    next(err);
  }
};

// CREATE
const createTable = async (req, res, next) => {
  try {
    const newTable = await Table.create(req.body);
    res.status(200).json(newTable);
  } catch (error) {
    next(error);
  }
};

// GET
const getTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};

// GET ALL
const getTables = async (_, res, next) => {
  try {
    const tables = await Table.find();
    console.log(tables);
    res.status(200).json(tables);
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateTable = async (req, res, next) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //? returns the modified document rather than the original one
      // By default, 'updatedTable' returns the original document before modifications.
      // A PUT request updates the database without providing the modified document on api endpoint.
    );
    res.status(200).json(updatedTable);
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteTable = async (req, res, next) => {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id);
    res.status(200).json({ "this table's been deleted --> ": deletedTable });
  } catch (error) {
    next(error);
  }
};

export {
  createTable,
  getTable,
  getTables,
  updateTable,
  deleteTable,
  getAvailableTables,
  reserveTable,
  getMyOrders,
};
