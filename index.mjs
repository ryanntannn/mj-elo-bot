import "dotenv/config";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { handleShoot } from "./lib/handler/shoot.mjs";
import { handleZimo } from "./lib/handler/zimo.mjs";
import { handleTransfer } from "./lib/handler/transfer.mjs";
import { handlePoints } from "./lib/handler/points.mjs";

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log("bot is launching 🕑");

bot.on(message("text"), async (ctx) => {
  const input = ctx.message.text;
  const command = input.split(" ")[0];

  switch (command) {
    case "/shoot":
      await handleShoot(ctx);
      break;

    case "/zimo":
      await handleZimo(ctx);
      break;

    case "/transfer":
      await handleTransfer(ctx);
      break;

    case "/points":
      await handlePoints(ctx);
      break;

    default:
      ctx.reply("Unknown command");
  }
});

bot.launch();
console.log("bot is launched 🚀");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
