import { Context } from "telegraf";
import { isValidTelegramUsername } from "../util/is-valid-telegram-username.mjs";
import { getPlayerPoints } from "../db/get-player-points.mjs";

/**
 * Handle /points command
 * @param {Context} ctx
 */
export async function handlePoints(ctx) {
  /** @type{string} */
  const input = ctx.message.text;

  // Check if second argument is a telegram handle
  let handle = input.split(" ")[1];
  if (!handle || !isValidTelegramUsername(handle)) {
    // If no handle is provided, use the sender's handle
    handle = "@" + ctx.message.from.username;
  }

  // Get points of handle
  const points = await getPlayerPoints(handle);

  if (!points) return ctx.reply(`${handle} has no points yet.`);

  ctx.reply(`${handle} has ${points} points.`);
}
