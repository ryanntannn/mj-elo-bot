/**
 * Checks if a number is a valid TAI
 * @param {number} tai
 * @returns {boolean}
 * @example
 * isValidTai(1); // true
 * isValidTai(5); // true
 * isValidTai(0); // false
 */
export const isValidTai = (tai) => {
  return tai > 0 && tai < 6;
};
