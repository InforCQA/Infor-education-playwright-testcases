import { createLogger, format, transports } from "winston";
import fs from "fs";
import path from "path";

const logDirectory= path.join(__dirname, "../logs");
if(!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory)
}

const logFile= path.join(logDirectory, `test-run.log`);

const log= createLogger ({
    level: "info",
    format: format.combine(
        format.timestamp({format: "YYYY-MM_DD HH:mm:ss"}),
        format.printf(({ timestamp, level, message})=> `${timestamp} [${level}]: ${message}`)
    ), 
    transports: [
        new transports.File({filename: logFile})
    ]
});

export default log;
