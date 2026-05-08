import { tractor, drawTractor } from "./tractor.js";
import { updateTractorPhysics } from "./physics.js";
import { field, drawField, updateRowWork } from "./fields.js";

let keys = {};
window.onkeydown = e => keys[e.key.toLowerCase()] = true;
window.onkeyup   = e => keys[e.key.toLowerCase()] = false;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let last = performance.now();

function loop(now) {
  const dt = (now - last) / 1000;
  last = now;

  updateTractorPhysics(tractor, keys, dt);
  updateRowWork(dt);

  ctx.clearRect(0,0,canvas.width,canvas.height);

  drawField(ctx);
  drawTractor(ctx);

  requestAnimationFrame(loop);
}

loop();
