import winston from 'winston';
import path from 'path';

// ?? D�finition du format des logs
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
);

// ?? Cr�ation du logger
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join('logs', 'api.log') })
    ],
});

// ? Utilise `export default logger;` pour l'import correct
export { logger };
