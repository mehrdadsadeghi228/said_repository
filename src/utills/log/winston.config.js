const winston = require('winston');
const { format } = winston;

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: 'combined.log',
    }),
    new winston.transports.File({
      filename: 'app-error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'app-info.log',
      level: 'info',
    
    })
  ]
    
});


module.exports = {logger};
