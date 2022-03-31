import winston from "winston";
// Adding the winston logger simple way. Now winston is 
// at our own disposal from wherever you import the logger
// (We did not get 100% proof this is IO-concurrency safe, but works at 
// least with our slow backend use. It might be that the createLogger
// works internally so that it guarantees 'singleton', but we should
// study more.)
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