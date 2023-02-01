const { Configuration, OpenAIApi } = require("openai");
const helper = require("../util/helper");
const TGBot = require("./../util/telegramBot");

require("dotenv").config();

const configuration = new Configuration({
  organization: "org-YR95NBCzvv0QcfylPqbWHVs2",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//Make a question to bot
const makeQuestionToBot = async (req, res) => {
  if (!req.body.question) {
    res.json(helper.ResponseData(412, "question parameter required!", null));
  }

  try {
    const completion = await openai.createCompletion({
      model: process.env.OPENAI_BOT_MODEL,
      prompt: req.body.question,
      temperature: 0,
      max_tokens: 200,
    });
    TGBot.telegramBot.telegram.sendMessage(
      process.env.TG_CHANNEL_ID,
      `Someone search with : "${req.body.question}"`
    );

    console.log("Response text : ", completion.data.choices[0].text);
    let data = {
      answer: completion.data.choices[0].text,
    };
    res.json(helper.ResponseData(0, "success", data));
  } catch (error) {
    console.log("Here have some error", error);
    res.json(helper.ResponseData(500, "Internal server error!", error));
  }
};

module.exports = {
  makeQuestionToBot,
};
