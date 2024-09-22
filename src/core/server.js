import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import hpp from "hpp";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import fileUpload from "express-fileupload";

const app = express()

const swaggerFile = require('../../swagger-output.json')

// Set security HTTP headers
app.use(helmet({
    crossOriginEmbedderPolicy: false,
}));

app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
}));

// Allow Cross-Origin requests
app.use(cors({
    "origin": "*",
}));


// Limit request from the same API 
const apiLimiter = rateLimit({
    max: 200,
    windowMs: 5 * 60 * 1000,
    message: "Too many request from this IP, please try again in five minutes",
});
app.use("/api", apiLimiter);

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

//& reqular middlewares 
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// cookies and file upload 
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// morgan middleware  to display logs on console of visited routes 
app.use(morgan("dev"));


// swagger ui documentation for api's 
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//routes


module.exports = app;