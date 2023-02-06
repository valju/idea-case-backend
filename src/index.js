import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes/api/index.js";
import logger from "./utils/logger.js";

// Finally just spelling mistake in the .env file sent me around in wild
// goose hunt. I got more and more away from correct solution :) Now fixed.
dotenv.config({});
// This will make the process.env.BE_SERVER_PORT etc. to be read from the .env file

const app = express();
app.use(cors()); // Merely disabling the cross-origin resource sharing safety mechanism! Hazardous!
app.use(express.json());  
// Middleware for parsing request body JSON => JS object for our use


app.use(process.env.BE_API_URL_PREFIX, routes);  // ***!!!***

// Just for easy testing - Is backend alive? No DB needed.
app.get("/", function(req, res) {
  res.send("Hello from the Node & Express Backend!").end();
});

app.listen(process.env.BE_SERVER_PORT);
logger.verbose(`Server started, port: ${process.env.BE_SERVER_PORT}.`);