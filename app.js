import dotenv from "dotenv"
import express, { urlencoded, json} from "express"
import rateLimit from "express-rate-limit";
// const dotenv = require("dotenv");
// const express = require("express");
// const rateLimit = require("express-rate-limit");
// const set = require("./routes/set");


import set from "./routes/set.js"

dotenv.config();

const app = express();

const BASE_URL = "api"

const PORT = process.env.PORT;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 25
})

app.use(urlencoded({ extended: false }));
app.use(json())

app.use(`/${BASE_URL}/sets`, set);
app.use(limiter)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})