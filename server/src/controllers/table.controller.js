import Table from "../models/Table.js";
import Day from "../models/Day.js";
import { allTables } from "../seeds/allTables.js";

// GET Available Tables
// Params for route : { data: String ("Dec 21 2012 09:00") }
const getAvailableTables = async (req, res, next) => {
  console.log("Request attempted");
  const { date } = req.body;

  try {
    const dateTime = new Date(date);

    // Find documents with the specified date
    const existingDocs = await Day.find({ date: dateTime });

    if (existingDocs.length) {
      console.log("Record exists. Sent docs.");
      res.status(200).send(existingDocs[0]);
    } else {
      // Create a new document with the searched date and default tables
      const newDay = await Day.create({ date: dateTime, tables: allTables });
      console.log("Created new datetime. Sent default docs.");

      // Retrieve the newly created document
      const createdDoc = await Day.findOne({ date: dateTime });
      res.status(200).send(createdDoc);
    }
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
};
