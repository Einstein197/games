// ===============================
// WELL SYSTEM (PRODUCES WATER → TANK)
// ===============================

// Dynamic production formula (infinite scaling)
function getWellProduction(level) {
  if (level === 0) return 0;

  const base = 3;        // Level 1 production
  const growth = 1.45;   // Growth multiplier per level

  return Math.round(base * Math.pow(growth, level - 1));
}

// Cost formula (infinite scaling)
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
  const hoursPassed = (now - state.well.lastUpdate) / 3600000;

  const productionRate = getWellProduction(state.well.level);
  const produced = hoursPassed * productionRate;

  if (produced > 0) {
    state.water.current = Math.min(
      state.water.current + produced,
      state.water.max
    );

    state.well.lastUpdate = now;
  }
}

// Upgrade well (NO MAX LEVEL)
function upgradeWell(state) {
  const nextLevel = state.well.level + 1;

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
