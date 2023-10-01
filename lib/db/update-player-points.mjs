import { supabase } from "./supabase.mjs";

/**
 * Update the points of a player, and return the updated points. If the player does not exist, create a new player with 1000 points.
 * @param {string} handle
 * @param {number} points
 * @returns {Promise<number>} updated points of handle
 */
export async function updatePlayerPoints(handle, points) {
  const { data, error } = await supabase
    .from("player_points")
    .select("*")
    .eq("handle", handle);

  const playerNoPoints = data.length <= 0;

  if (playerNoPoints) {
    await supabase
      .from("player_points")
      .insert([{ handle, points: 1000 + points }]);

    return 1000 + points;
  }

  await supabase
    .from("player_points")
    .update({ points: data[0].points + points })
    .eq("handle", handle);

  return data[0].points + points;
}
