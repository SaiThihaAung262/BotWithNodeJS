const express = require("express");
const { Telegraf } = require("telegraf");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const routes = require("./routes/routes");
const helper = require("./util/helper");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  helper.ResponseData(0, "success", null);
});

routes(app);

module.exports = app;
