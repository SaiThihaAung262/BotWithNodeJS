const { Telegraf } = require("telegraf");
require("dotenv").config();

const telegramBot = new Telegraf(process.env.TG_BOT_TOKEN);

module.exports = { telegramBot };
