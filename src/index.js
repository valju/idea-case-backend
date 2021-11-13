import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";
import cors from "cors";
import routes from "./routes/api/index";

require('dotenv').config();   
// This will make the process.env.BE_SERVER_PORT etc. to be read from the .env file

// Adding the winston logger to the project, this will not work like this though,
// Why? We need to have just one instance of the stream to ensure the app
// logging goes to same file and console and in the order the logging command
// happens. Thus we would need to add winston to the Express app.
// But here the simple winston setup code, for learning.
const winston = require('winston');    // get the module from node modules
const logConfiguration = {           // set up console and log file as outputs
  'transports': [
    new winston.transports.Console,
    new winston.transports.File({
      filename: './logs/winstonBackendLog.log'
    })
  ]
};
const logger = winston.createLogger(logConfiguration); // create corresponding logger object
// https://github.com/winstonjs/winston#using-logging-levels 
// Winston's ready-given, logging levels from most severe to just silly:
// error, warn, info, verbose, debug, silly

const app = express();

app.use(cors());  // Merely disabling the cross-origin safety mechanism! Hazardous!

app.use(express.json());
app.use(express.urlencoded());

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