import { format, transports, createLogger } from 'winston';

// Adding the winston logger simple way. Now winston is 
// at our own disposal from wherever you import the 'logger'
// NPM: https://www.npmjs.com/package//winston

// Modifying the log for easier reading
const customFormat = format.combine(
  format.timestamp({ format: "YYYYMMDD|HH:mm:ss" }),
  // format.splat(),   // It would be possible to log also error _objects_
  format.printf((info) => {
    return `${info.timestamp}|${info.level.toLocaleUpperCase()}| ${info.message}`;
  }),
);

const logConfiguration = {           // set up console and log file as outputs
  format: customFormat,
  transports: [
      new transports.Console({
        level: "silly"
      }),
      new transports.File({
        filename: './logs/backendLog.log',
        level: "debug"
      }),
      new transports.File({
        filename: './logs/errorLog.log',
        level: "error"
      }),
    ]
};

// create one corresponding logger object, and export it for other modules 
export default (createLogger(logConfiguration)); 

// https://github.com/winstonjs/winston#using-logging-levels 
// Winston's ready-configured, logging levels were just fine.
// From most severe to just silly:
// 0 error, 1 warn, 2 info, 3 verbose, 4 debug, 5 silly