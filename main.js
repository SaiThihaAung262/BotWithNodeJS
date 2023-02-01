const express = require("express");
const { Telegraf } = require("telegraf");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const routes = require("./routes/routes");
const helper = require("./util/helper");

require("dotenv").config();

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.get("/test", (req, res) => {
//   helper.ResponseData(0, "success", null);
// });

// routes(app);

// const PORT = process.env.PORT || 9000;
// app.listen(PORT, () => {
//   console.log(`Server is listening on PORT ${PORT}`);
// });

const configuration = new Configuration({
  organization: "org-YR95NBCzvv0QcfylPqbWHVs2",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const bot = new Telegraf(process.env.TG_BOT_TOKEN);

bot.start((ctx) => {
  let message = `Please use the /fact command to receive a new fact`;
  ctx.reply(message);
});

bot.on("text", async (ctx) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ctx.update.message.text,
      temperature: 0,
      max_tokens: 200,
    });

    // console.log(completion.data);
    console.log(completion.data.choices[0].text);
    ctx.reply(completion.data.choices[0].text);
  } catch (error) {
    console.log("Here have some errro", error);
  }
});

bot.launch();
