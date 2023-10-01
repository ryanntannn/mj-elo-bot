/**
 * Check if a string is a valid Telegram username.
 * @param {string} username
 * @returns {boolean}
 * @example
 * isValidTelegramUsername("@telegram_handle"); // true
 * isValidTelegramUsername("@telegram handle with spaces"); // false
 * isValidTelegramUsername("telegram_handle_without_at"); // false
 */
export function isValidTelegramUsername(username) {
  return username.split("")[0] === "@" && !username.includes(" ");
}
