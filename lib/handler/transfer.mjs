import { Context } from "telegraf";
import { isValidTelegramUsername } from "../util/is-valid-telegram-username.mjs";
import { updatePlayerPoints } from "../db/update-player-points.mjs";

/**
 * Handle /transfer command
 * @param {Context} ctx
 */
export async function handleTransfer(ctx) {
  /** @type{string} */
  const input = ctx.message.text;
  const points = parseInt(input.split(" ")[1]);

  if (!points)
    return ctx.reply("usage: /transfer [amount] [@telegram_handle_of_winner]");

  // Check if second argument is a telegram handle
  const winnerHandle = input.split(" ")[2];
  if (!winnerHandle || !isValidTelegramUsername(winnerHandle))
    return ctx.reply("usage: /transfer [amount] [@telegram_handle_of_winner]");

  const shooterHandle = "@" + ctx.message.from.username;

  // Deduct points from shooter
  const shooterPoints = await updatePlayerPoints(shooterHandle, -points);

  // Add points to winner
  const winnerPoints = await updatePlayerPoints(winnerHandle, points);

  ctx.reply(
    `${shooterHandle} gave ${points} points to ${winnerHandle}.

${shooterHandle} now has ${shooterPoints} points
${winnerHandle} now has ${winnerPoints} points`
  );
}
