const { Telegraf } = require("telegraf");
const { Configuration, OpenAIApi } = require("openai");
const helper = require("../util/helper");
require("dotenv").config();

const configuration = new Configuration({
  organization: "org-YR95NBCzvv0QcfylPqbWHVs2",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.makeQuestionToBot = async (req, res) => {
  console.log("Here is request", req);
  if (!req.body.question) {
    req.json({
      err_code: 412,
      err_msg: "question parameter required!",
    });
  }
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.question,
      temperature: 0,
      max_tokens: 200,
    });

    res.json(
      helper.ResponseData(0, "success", completion.data.choices[0].text)
    );
  } catch (error) {
    console.log("Here have some error", error);
    res.json(helper.ResponseData(500, "Internal server error!", error));
  }
};
