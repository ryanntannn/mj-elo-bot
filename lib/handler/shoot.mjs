import { Context } from "telegraf";
import { isValidTai } from "../util/is-valid-tai.mjs";
import { isValidTelegramUsername } from "../util/is-valid-telegram-username.mjs";
import { taiToPointsShooter } from "../util/tai-to-points.mjs";
import { updatePlayerPoints } from "../db/update-player-points.mjs";

/**
 * Handle /shoot command
 * @param {Context} ctx
 */
export async function handleShoot(ctx) {
  /**@type{string} */
  const input = ctx.message.text;
  // Check if first argument is a number between 1 and 5
  const tai = parseInt(input.split(" ")[1]);

  if (!tai || !isValidTai(tai))
    return ctx.reply("usage: /shoot [1-5] [@telegram_handle_of_winner]");

  // Check if second argument is a telegram handle
  const winnerHandle = input.split(" ")[2];
  if (!winnerHandle || !isValidTelegramUsername(winnerHandle))
    return ctx.reply("usage: /shoot [1-5] [@telegram_handle_of_winner]");

  const shooterHandle = "@" + ctx.message.from.username;
  const points = taiToPointsShooter(tai);

  // Deduct points from shooter
  const shooterPoints = await updatePlayerPoints(shooterHandle, -points);

  // Add points to winner
  const winnerPoints = await updatePlayerPoints(winnerHandle, points);

  ctx.reply(
    `HU! ${shooterHandle} shot ${tai} tai (${points} points) to ${winnerHandle}.

${shooterHandle} now has ${shooterPoints} points
${winnerHandle} now has ${winnerPoints} points`
  );
}
