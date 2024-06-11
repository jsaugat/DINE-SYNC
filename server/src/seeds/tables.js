// seed-table-data.js
import mongoose from "mongoose";
import Table from "../models/Table.js";
import dotenv from "dotenv";
dotenv.config();

const tablesData = [
  { number: 1, capacity: 4, status: "available" },
  { number: 2, capacity: 4, status: "available" },
  { number: 3, capacity: 4, status: "available" },

  { number: 4, capacity: 2, status: "available" },
  { number: 5, capacity: 2, status: "available" },
  { number: 6, capacity: 2, status: "available" },
  { number: 7, capacity: 2, status: "available" },

  { number: 8, capacity: 6, status: "available" },
  { number: 9, capacity: 6, status: "available" },

  { number: 10, capacity: 8, status: "available" },
  { number: 11, capacity: 8, status: "available" },
  { number: 12, capacity: 8, status: "available" },
];

//? Function to seed tables with a Tables Data
const seedTables = async (tablesData) => {
  try {
    // Clear existing data (optional)
    await Table.deleteMany({});

    // Seed tables with pre-defined data
    await Table.insertMany(tablesData);

    console.log(`${tablesData.length} tables seeded successfully.`);
  } catch (error) {
    console.error("Error seeding tables:", error);
  } finally {
    // Close the connection after seeding
    mongoose.disconnect();
    console.log("MONGODB Disconnected");
  }
};

//? Connect to the database
if (import.meta.main) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("SEED: MongoDB connected");
    await seedTables(tablesData);
    await mongoose.disconnect();
  } catch (error) {
    console.error("SEED: MongoDB connection error:", error);
  }
}

export { tablesData };
