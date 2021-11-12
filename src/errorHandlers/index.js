// winston logger (one and only one instance!) should be somehow
// injected in the node backend. Not done yet.
// Just replace the 
// logger.error(message) or logger.debug with: console.log(message) until
// you have the logger working


const SERVER_ERROR_MESSAGE = "Server error.";
const DB_ERROR_MESSAGE = SERVER_ERROR_MESSAGE;
const REQUEST_BASED_ERROR_MESSAGE = "Request error.";

const SERVER_ERROR_MESSAGE_TO_LOG = "Server error happened.";
const DB_ERROR_MESSAGE_TO_LOG = "Database error happened.";
const REQUEST_BASED_ERROR_MESSAGE_TO_LOG = "Request error.";


export const databaseErrorHandler = (res, dbError, message) => {
  if(!message) { 
    message = DB_ERROR_MESSAGE_TO_LOG;
  }
  message += " Db error code: "+dbError.errno;
  
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

export const requestErrrorHandler = (res, message) => {
  if(!message) { 
    message = REQUEST_BASED_ERROR_MESSAGE_TO_LOG;
  }
  
  logger.error(message);
  res.status(400).send(REQUEST_BASED_ERROR_MESSAGE).end();
}

export const successHandler = (res, data, message) => {
  if(!message) { 
    message = "Successful operation."
  }
  
  logger.debug(message);  
  res.status(200).send(data).end();  
}
