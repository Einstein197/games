// ===============================
// WELL SYSTEM (PRODUCES WATER → TANK)
// ===============================

// Dynamic production formula (infinite scaling)
function getWellProduction(level) {
  if (level === 0) return 0;

  const base = 3;        // Level 1 production
  const growth = 1.6;   // Growth multiplier per level

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
  if (!state.well.lastUpdate) {
    state.well.lastUpdate = Date.now();
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
  if (!state.well || state.well.level === 0) return;
  
  ensureWaterTank(state);

  const now = Date.now();
  const hoursPassed = (now - state.well.lastUpdate) / 3600000;
  const productionRate = getWellProduction(state.well.level);
  let produced = hoursPassed * productionRate;

  if (produced >= 0.01) {  // Only add if at least 0.01 water
    // Get whole numbers only to avoid decimals
    const wholeWater = Math.floor(produced);
    
    if (wholeWater > 0) {
      state.water.current = Math.min(
        state.water.current + wholeWater,
        state.water.max
      );
      // Adjust lastUpdate based on water actually added
      const hoursUsed = wholeWater / productionRate;
      state.well.lastUpdate += hoursUsed * 3600000;
    } else {
      // Less than 1 water produced, just update timestamp
      state.well.lastUpdate = now;
    }
  }
  
  // Keep water as whole number
  state.water.current = Math.floor(state.water.current);
}

// Upgrade well (NO MAX LEVEL)
function upgradeWell(state) {
  const nextLevel = state.well.level + 1;
  const cost = getWellCost(nextLevel);

  if (state.coins < cost) {
    return {
      ok: false,
      msg: `❌ Need ${cost} coins for level ${nextLevel}! You have ${Math.floor(state.coins)}.`
    };
  }

  const oldLevel = state.well.level;
  const oldProduction = getWellProduction(oldLevel);
  const newProduction = getWellProduction(nextLevel);
  
  state.coins -= cost;
  state.well.level = nextLevel;
  state.well.lastUpdate = Date.now(); // Reset timer after upgrade

  return {
    ok: true,
    msg: `✅ Well upgraded to level ${nextLevel}! Production: ${oldProduction} → ${newProduction} water/hr`
  };
}// ===============================
// WELL SYSTEM (PRODUCES WATER → TANK)
// ===============================

// Dynamic production formula (infinite scaling)
function getWellProduction(level) {
  if (level === 0) return 0;
  const base = 3;
  const growth = 1.6;
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
  if (!state.well.lastUpdate) {
    state.well.lastUpdate = Date.now();
  }
}

// Update water production from well → tank
function updateWellWater(state) {
  if (!state.well || state.well.level === 0) return;
  
  const now = Date.now();
  const hoursPassed = (now - state.well.lastUpdate) / 3600000;
  const productionRate = getWellProduction(state.well.level);
  let produced = hoursPassed * productionRate;
  
  if (produced >= 0.01) {
    const wholeWater = Math.floor(produced);
    if (wholeWater > 0) {
      state.water.current = Math.min(state.water.current + wholeWater, state.water.max);
      const hoursUsed = wholeWater / productionRate;
      state.well.lastUpdate += hoursUsed * 3600000;
    } else {
      state.well.lastUpdate = now;
    }
  }
  
  state.water.current = Math.floor(state.water.current);
}

// Upgrade well
function upgradeWell(state) {
  const nextLevel = state.well.level + 1;
  const cost = getWellCost(nextLevel);
  
  if (state.coins < cost) {
    return {
      ok: false,
      msg: `❌ Need ${cost} coins for level ${nextLevel}! You have ${Math.floor(state.coins)}.`
    };
  }
  
  const oldLevel = state.well.level;
  const oldProduction = getWellProduction(oldLevel);
  const newProduction = getWellProduction(nextLevel);
  
  state.coins -= cost;
  state.well.level = nextLevel;
  state.well.lastUpdate = Date.now();
  
  return {
    ok: true,
    msg: `✅ Well upgraded to level ${nextLevel}! Production: ${oldProduction} → ${newProduction} water/hr`
  };
}

// Use water
function useWater(state) {
  if (!state.water) {
    state.water = { current: 20, max: 20 };
  }
  if (state.water.current < 1) {
    return false;
  }
  state.water.current -= 1;
  return true;
}

// Make functions globally available
window.getWellProduction = getWellProduction;
window.getWellCost = getWellCost;
window.initWell = initWell;
window.updateWellWater = updateWellWater;
window.upgradeWell = upgradeWell;
window.useWater = useWater;

// Use 1 water from tank (for watering crops)
function useWater(state) {
  ensureWaterTank(state);

  if (state.water.current < 1) {
    return false;
  }

  state.water.current -= 1;
  return true;
}