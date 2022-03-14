import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes/api/index.js";
import winston from "winston";

// THESE LINES DID NOT WORK, SO LET'S SET ENV VARIABLES FROM CONSOLE, SEE README.md
// import dotenv from 'dotenv';
dotenv.config({});
// This will make the process.env.BE_SERVER_PORT etc. to be read from the .env file
// REPLACED this by running the > source env_variables.sh     before npm start 

const app = express();

// Adding the winston logger to the project, simple way. Now winston is 
// at our own disposal, even if it's not handling e.g. logging for Express
const logConfiguration = {           // set up console and log file as outputs
  'transports': [
    new winston.transports.Console({
      level: "silly"
    }),
    new winston.transports.File({
      filename: './logs/winstonBackendLog.log',
      level: "debug"
    }),
  ]
};
// create one corresponding logger object, and export it to other modules
export const logger = winston.createLogger(logConfiguration); 
// https://github.com/winstonjs/winston#using-logging-levels 
// Winston's ready-given, logging levels from most severe to just silly:
// error, warn, info, verbose, debug, silly

app.use(cors());  // Merely disabling the cross-origin safety mechanism! Hazardous!

app.use(express.json());
//app.use(express.urlencoded());

console.log(process.env.BE_API_URL_PREFIX);
app.use(process.env.BE_API_URL_PREFIX, routes);

app.get("/", function(req, res) {
  res.send("Hello from the Node&Express Backend!").end();
});

/*
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json({ error: error.message });
});
*/

app.listen(process.env.BE_SERVER_PORT);
console.log(`Node server started and listens to \
              port ${process.env.BE_SERVER_PORT}.`);