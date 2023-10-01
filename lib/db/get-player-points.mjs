import { supabase } from "./supabase.mjs";

/**
 * Get the points of a player by handle
 * @param {string} handle
 * @returns {Promise<number | null>} points of handle
 */
export async function getPlayerPoints(handle) {
  const { data, error } = await supabase
    .from("player_points")
    .select("*")
    .eq("handle", handle);

  if (error || !data || data.length <= 0) return null;

  return data[0].points;
}
