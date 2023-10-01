const threeSixShooterPayoutChart = {
  1: 4,
  2: 7,
  3: 11,
  4: 20,
  5: 40,
};

const threeSixZimoPayoutChart = {
  1: 2,
  2: 3,
  3: 5,
  4: 10,
  5: 20,
};

/**
 * Converts a tai to points
 * @param {number} tai
 * @returns {number}
 * @example
 * taiToPointsShooter(1); // 4
 * taiToPointsShooter(5); // 40
 */
export function taiToPointsShooter(tai) {
  return threeSixShooterPayoutChart[tai];
}

export function taiToPointsZimo(tai) {
  return threeSixZimoPayoutChart[tai];
}
