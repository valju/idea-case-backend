//import {logger} from "../index.js"
import { our_logger as logger } from "../index.js";
// OUR IDEA: Not telling real probs to the frontend or other caller,
// but actually just telling if we have a) 200 OK, 400 Request based error, 
// 500 Server error.

// winston logger (one and only one instance!) should be somehow
// injected in the node backend. Not done yet.
// Just replaced the 
// logger.error(message) or logger.debug with: console.log(message) until
// you have the logger working



const SERVER_ERROR_MESSAGE = "Server error.";
// Atm. just telling caller wether request or server error. Thus no database prob revealed:
const DB_ERROR_MESSAGE = SERVER_ERROR_MESSAGE; 
const REQUEST_BASED_ERROR_MESSAGE = "Request error.";

const SERVER_ERROR_MESSAGE_TO_LOG = "Server error happened.";
const DB_ERROR_MESSAGE_TO_LOG = "Database error happened.";
const REQUEST_BASED_ERROR_MESSAGE_TO_LOG = "Request error.";

const SUCCESS_MESSAGE_TO_LOG = "Successful operation.";

// NOTICE HOW MOST INFO GOES THROUGH THE LOGGER
// TO FRONTEND WE ONLY RETURN EITHER 
// - 200 OK,     or
// - 400 "Request error"   (or similar)
// - 500 "Server error" (Not telling the possible hacker even that was it DB server prob, or
// backend app server prob)

export const databaseErrorHandler = (res, dbError, message) => {
  if(!message) { 
    message = DB_ERROR_MESSAGE_TO_LOG;
  }
  message += " Db error code: "+dbError.errno;
  message += " Db error message: "+dbError.message;
  logger.error(message);
  //console.log(message);
    
  res.status(500).send(DB_ERROR_MESSAGE).end();
}

export const serverErrorHandler = (res, message) => {
  if(!message) { 
    message = SERVER_ERROR_MESSAGE_TO_LOG;
  }
  
  logger.error(message);
  //console.log(message);
  res.status(500).send(SERVER_ERROR_MESSAGE).end();
}

export const requestErrorHandler = (res, message) => {
  if(!message) { 
    message = REQUEST_BASED_ERROR_MESSAGE_TO_LOG;
  }
  
  logger.error(message);
  //console.log(message);
  res.status(400).send(REQUEST_BASED_ERROR_MESSAGE).end();
}

export const successHandler = (res, data, message) => {
  if(!message) { 
    message = SUCCESS_MESSAGE_TO_LOG; 
  }
  logger.verbose(message);

  // This was 
  // console.log("TEST: "+process.env.TEST);

  res.status(200).send(data).end();  
}