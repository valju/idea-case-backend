import "@babel/polyfill";
import express from "express";
import cors from "cors";
import routes from "./routes/api/index";
import bodyParser from "body-parser";

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

import { SERVER_SETTINGS } from "./CONSTANTS";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const init = async () => {
  await app.use(SERVER_SETTINGS.api_url_prefix, routes);

  await app.get("/", function(req, res) {
    res.send("Hello from the Node&Express Backend!").end();
  });

  await app.use((error, req, res, next) => {
    return res.status(error.status || 500).json({ error: error.message });
  });

  await app.listen(SERVER_SETTINGS.port);

  console.log(`Node server started and listens to \
              port ${SERVER_SETTINGS.port}.`);
};

init();
