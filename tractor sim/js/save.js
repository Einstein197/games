export function saveState(state) {
  localStorage.setItem("tractorUltraState", JSON.stringify(state));
}

export function loadState(defaultState) {
  const saved = localStorage.getItem("tractorUltraState");
  if (!saved) return structuredClone(defaultState);
  try {
    return { ...defaultState, ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultState);
  }
}
