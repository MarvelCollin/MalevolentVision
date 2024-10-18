import { ctx, canvas } from "./ctx.js";
import { drawPlayer, movePlayer, player } from "./components/player/player.js";
import { drawBoxes } from "./components/boxes/boxes.js";
import { drawFlashlight, flashlight } from "./components/tools/flashlight.js";
import { keys, setupInput } from "./components/listeners/input.js";
import { updateCamera, applyCameraTransform } from "./components/camera/camera.js";

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  applyCameraTransform();
  drawBoxes();
  drawPlayer();
  drawFlashlight();
  movePlayer(keys);
}

function updateFlashlightRotation(e) {
  const dx = e.clientX - (player.x + player.width / 2);
  const dy = e.clientY - (player.y + player.height / 2);
  flashlight.rotation = Math.atan2(dy, dx);
}

window.addEventListener("mousemove", updateFlashlightRotation);

setupInput();

function start() {
  updateCamera();
  movePlayer(keys);
  drawScene();
  requestAnimationFrame(start);
}

start();
