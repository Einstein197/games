// ===============================
// WELL SYSTEM (PRODUCES WATER → TANK)
// ===============================

// Production per hour for each level
// Index = level (0 = no well)
const WELL_PRODUCTION = [
  0,   // Level 0 (no well)
  5,   // Level 1
  10,  // Level 2
  20,  // Level 3
  35,  // Level 4
  50   // Level 5
];

// Cost formula
function getWellCost(level) {
  return level * 1000;
}

// Initialize well state if missing
function initWell(state) {
  if (!state.well) {
    state.well = {
      level: 0,
      lastUpdate: Date.now()
    };
  }
}

// Ensure tank exists (safe fallback)
function ensureWaterTank(state) {
  if (!state.water) {
    state.water = {
      current: 20,
      max: 20
    };
  }
}

// Update water production from well → tank
function updateWellWater(state) {
  ensureWaterTank(state);

  const now = Date.now();

  const hoursPassed =
    (now - state.well.lastUpdate) / 3600000;

  const productionRate =
    WELL_PRODUCTION[state.well.level] || 0;

  const produced =
    hoursPassed * productionRate;

  if (produced > 0) {
    state.water.current = Math.min(
      state.water.current + produced,
      state.water.max
    );

    state.well.lastUpdate = now;
  }
}

// Upgrade well
function upgradeWell(state) {

  const nextLevel = state.well.level + 1;

  if (nextLevel >= WELL_PRODUCTION.length) {
    return {
      ok: false,
      msg: "Max well level reached"
    };
  }

  const cost = getWellCost(nextLevel);

  if (state.coins < cost) {
    return {
      ok: false,
      msg: "Not enough coins"
    };
  }

  state.coins -= cost;
  state.well.level = nextLevel;

  return {
    ok: true,
    msg: `Well upgraded to level ${nextLevel}!`
  };
}

// Use 1 water from tank (for watering crops)
function useWater(state) {

  ensureWaterTank(state);

  if (state.water.current < 1) {
    return false;
  }

  state.water.current -= 1;
  return true;
}