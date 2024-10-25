// camera.js
import { canvas } from "../../ctx.js";
import { player } from "../../game.js";

export let camera = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

export function updateCamera() {
  camera.x = player.x - camera.width / 2;
  camera.y = player.y - camera.height / 2;
}

export function applyCameraTransform(ctx) {
  ctx.setTransform(1, 0, 0, 1, -camera.x, -camera.y);
}
