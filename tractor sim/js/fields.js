import { tractor } from "./tractor.js";

export const field = {
  x: 60,
  y: 40,
  w: 360,
  h: 200,
  rowCount: 8,
  rows: []
};

for (let i = 0; i < field.rowCount; i++) {
  field.rows.push({
    progress: 0,
    plowed: false
  });
}

export function getRowUnderTractor() {
  const tx = tractor.x;
  const ty = tractor.y;

  if (tx < field.x || tx > field.x + field.w ||
      ty < field.y || ty > field.y + field.h) return null;

  const rowHeight = field.h / field.rowCount;
  const index = Math.floor((ty - field.y) / rowHeight);
  return { row: field.rows[index], index };
}

export function tractorAlignedWithRow() {
  return Math.abs(Math.cos(tractor.angle)) > 0.85;
}

export function updateRowWork(dt) {
  const info = getRowUnderTractor();
  if (!info) return;

  const row = info.row;

  if (!tractorAlignedWithRow()) return;
  if (Math.abs(tractor.speed) < 0.05) return;

  row.progress += Math.abs(tractor.speed) * dt * 0.4;

  if (row.progress >= 1) {
    row.progress = 1;
    row.plowed = true;
  }
}

export function drawField(ctx) {
  const rowHeight = field.h / field.rowCount;

  for (let i = 0; i < field.rowCount; i++) {
    const r = field.rows[i];
    const y = field.y + i * rowHeight;

    ctx.fillStyle = "#3a2b10";
    ctx.fillRect(field.x, y, field.w, rowHeight - 1);

    ctx.fillStyle = "#5a3b20";
    ctx.fillRect(field.x, y, field.w * r.progress, rowHeight - 1);
  }

  ctx.strokeStyle = "#555";
  ctx.strokeRect(field.x, field.y, field.w, field.h);
}
