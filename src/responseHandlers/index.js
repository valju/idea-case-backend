import { our_logger as logger } from "../index.js";
// NOTICE HOW MOST INFO GOES THROUGH THE LOGGER
// TO FRONTEND WE ONLY RETURN EITHER 
// - 200 OK,     or
// - 400 "Request error"   (or similar)
// - 500 "Server error" (Not telling the possible hacker even whether it was DB or
// backend app server prob. Not telling table names or missing columns or such!)

const SERVER_ERROR_MESSAGE = "Server error.";
const DB_ERROR_MESSAGE = SERVER_ERROR_MESSAGE; 
const REQUEST_BASED_ERROR_MESSAGE = "Request error.";
const VALIDATION_BASED_ERROR_MESSAGE = REQUEST_BASED_ERROR_MESSAGE;

const SERVER_ERROR_MESSAGE_TO_LOG = "Server error.";
const DB_ERROR_MESSAGE_TO_LOG = "Database error: ";
const REQUEST_BASED_ERROR_MESSAGE_TO_LOG = "Request error.";
const VALIDATION_ERROR_MESSAGE_TO_LOG = "Validation error.";

const SUCCESS_MESSAGE_TO_LOG = "Successful operation.";

export const databaseErrorHandler = (res, dbError, message) => {
  if(!message) { 
    message = DB_ERROR_MESSAGE_TO_LOG;
  }
  message += " Db error code: "+dbError.errno;
  message += " Db error message: "+dbError.message;
  logger.error(message);
    
  res.status(500).send(DB_ERROR_MESSAGE).end();
}

export const serverErrorHandler = (res, message) => {
  if(!message) { 
    message = SERVER_ERROR_MESSAGE_TO_LOG;
  } 
  logger.error(message);

  res.status(500).send(SERVER_ERROR_MESSAGE).end();
}

export const requestErrorHandler = (res, message) => {
  if(!message) { 
    message = REQUEST_BASED_ERROR_MESSAGE_TO_LOG;
  }
  logger.error(message);

  res.status(400).send(REQUEST_BASED_ERROR_MESSAGE).end();
}

export const validationErrorHandler = (res, message) => {
  if (!message) {
    message = VALIDATION_ERROR_MESSAGE_TO_LOG;
  }
  logger.error(message);
  
  res.status(400).send(VALIDATION_BASED_ERROR_MESSAGE);
};

export const successHandler = (res, data, message) => {
  if(!message) { 
    message = SUCCESS_MESSAGE_TO_LOG; 
  }
  logger.verbose(message);

  if(typeof(data)==="number") {     
    data = {returnValue:data};   
    // Wrapping number values inside an object so that
    // express will not strangely use it automatically
    // as http status code. E.g. replacing 200 below with
    // let say 1! Don't ask me why they offer such 'help' :)
  }

  res.status(200).send(data).end();  
}