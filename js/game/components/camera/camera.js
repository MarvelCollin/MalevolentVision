import { canvas } from "../../ctx.js";
import { player } from "../../game.js";

export let camera = {
  x: 0,
  y: 0,
};

export function updateCamera() {
  camera.x = player.x - canvas.width / 4;
  camera.y = player.y - canvas.height / 4;
}

export function applyCameraTransform(ctx) {
  ctx.setTransform(1, 0, 0, 1, -camera.x, -camera.y);
}
