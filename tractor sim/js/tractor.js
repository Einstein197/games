export const tractor = {
  x: 240,
  y: 260,
  angle: -Math.PI/2,
  speed: 0,
  accel: 0.02,
  maxSpeed: 0.8,
  turnSpeed: 0.03,
  friction: 0.985,
  width: 14,
  length: 22,
  implementWidth: 18
};

export function drawTractor(ctx) {
  ctx.save();
  ctx.translate(tractor.x, tractor.y);
  ctx.rotate(tractor.angle);

  ctx.fillStyle = "#d62828";
  ctx.fillRect(-tractor.width/2, -tractor.length/2, tractor.width, tractor.length);

  ctx.fillStyle = "#222";
  ctx.fillRect(-tractor.width/2 + 2, -tractor.length/2 + 2, tractor.width - 4, 8);

  ctx.fillStyle = "#111";
  ctx.fillRect(-tractor.width/2 - 3, -tractor.length/2, 6, 8);
  ctx.fillRect(tractor.width/2 - 3, -tractor.length/2, 6, 8);
  ctx.fillRect(-tractor.width/2 - 3, tractor.length/2 - 8, 6, 8);
  ctx.fillRect(tractor.width/2 - 3, tractor.length/2 - 8, 6, 8);

  ctx.restore();
}
