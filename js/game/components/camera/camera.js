import { ctx, canvas } from "../../ctx.js";
import { player } from "../player/player.js";

export let camera = {
  x: 0,
  y: 0,
};

export function updateCamera() {
  camera.x = player.x - canvas.width / 2 + player.width / 2;
  camera.y = player.y - canvas.height / 2 + player.height / 2;
}

export function applyCameraTransform() {
  ctx.setTransform(1, 0, 0, 1, -camera.x, -camera.y);
}
