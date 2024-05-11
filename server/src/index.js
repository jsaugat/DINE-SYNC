import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
// import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import {
  notFoundHandler,
  errorHandler,
} from "./middlewares/error.middleware.js";
import tablesRoute from "./routes/tables.js";
import reservationRoute from "./routes/reservation.js";

dotenv.config(); // can use process.env now
const port = process.env.PORT || 6900;

//? GLOBAL middleware
app.use("/", (req, res, next) => {
  console.log("Request Details :");
  console.table({
    time: new Date().toLocaleTimeString(),
    method: req.method,
    path: req.url,
    // body: JSON.stringify(req.body)
  });
  console.log("\x1b[32m%s\x1b[0m", "REQUEST BODY :");
  console.table(req.body);
  console.log("reqUser: ", req.user);
  next();
});

//? ROUTES middlewares
app.use("/api/auth", authRoute);
app.use("/api/tables", tablesRoute);
app.use("/api/reservation", reservationRoute);
// app.use("/api/users", usersRoute);

//! 404 and error handler middlewares
app.use(notFoundHandler);
app.use(errorHandler);

//? Database connection : async function returns a Promise
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`👁️  WATCHING PORT : http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Sorry!, Express couldn't talk to database`, error);
  });
