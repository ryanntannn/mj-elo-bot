import { Context } from "telegraf";
import { isValidTai } from "../util/is-valid-tai.mjs";
import { isValidTelegramUsername } from "../util/is-valid-telegram-username.mjs";
import { taiToPointsZimo } from "../util/tai-to-points.mjs";
import { updatePlayerPoints } from "../db/update-player-points.mjs";

/**
 * Handle /zimo command
 * @param {Context} ctx
 */
export async function handleZimo(ctx) {
  const input = ctx.message.text;
  // Check if first argument is a number between 1 and 5
  const tai = parseInt(input.split(" ")[1]);

  if (!tai || !isValidTai(tai))
    return ctx.reply(
      "usage: /zimo [1-5] [@telegram_handle_of_loser1] [@telegram_handle_of_loser2] [@telegram_handle_of_loser3]"
    );

  console.log(input.split(" ").splice(2));

  // Check if next 3 arguments are telegram handles
  const loserHandles = input
    .split(" ")
    .splice(2)
    .map((handle) => (isValidTelegramUsername(handle) ? handle : null));

  console.log(loserHandles);

  if (loserHandles.includes(null))
    return ctx.reply(
      "usage: /zimo [1-5] [@telegram_handle_of_loser1] [@telegram_handle_of_loser2] [@telegram_handle_of_loser3]"
    );

  const winnerHandle = "@" + ctx.message.from.username;
  const points = taiToPointsZimo(tai);

  // Deduct points from losers
  const loserMessageStrings = await Promise.all(
    loserHandles.map(async (loserHandle) => {
      const loserPoints = await updatePlayerPoints(loserHandle, -points);
      return `${loserHandle} now has ${loserPoints} points`;
    })
  );

  // Add points to winner
  const winnerPoints = await updatePlayerPoints(winnerHandle, points * 3);

  ctx.reply(
    `HU! ${winnerHandle} zimo ${tai} tai (${points} points) from ${loserHandles.join(
      ", "
    )}.

${winnerHandle} now has ${winnerPoints} points
${loserMessageStrings.join("\n")}`
  );
}
