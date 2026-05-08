export function updateTractorPhysics(tractor, keys, dt) {
  if (keys.w) tractor.speed += tractor.accel;
  if (keys.s) tractor.speed -= tractor.accel * 0.6;

  tractor.speed *= tractor.friction;

  if (tractor.speed > tractor.maxSpeed) tractor.speed = tractor.maxSpeed;
  if (tractor.speed < -tractor.maxSpeed * 0.5) tractor.speed = -tractor.maxSpeed * 0.5;

  if (Math.abs(tractor.speed) < 0.01) tractor.speed = 0;

  if (tractor.speed !== 0) {
    if (keys.a) tractor.angle -= tractor.turnSpeed;
    if (keys.d) tractor.angle += tractor.turnSpeed;
  }

  tractor.x += Math.cos(tractor.angle) * tractor.speed * 60 * dt;
  tractor.y += Math.sin(tractor.angle) * tractor.speed * 60 * dt;
}
