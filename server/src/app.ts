import express from "express";
import cors from "cors";
const routes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
