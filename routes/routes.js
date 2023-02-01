const router = require("express").Router();

const openAi = require("./../controllers/openAiBotController");

module.exports = (app) => {
  router.post("/openai/ask", openAi.makeQuestionToBot);
  app.use("/api", router);
};
