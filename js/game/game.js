import { ctx, canvas } from "./ctx.js";
import { drawPlayer, movePlayer, player } from "./components/player/player.js";
import { drawBoxes } from "./components/boxes/boxes.js";
import { drawFlashlight, flashlight } from "./components/tools/flashlight.js";
import { keys, setupInput } from "./components/listeners/input.js";
import { updateCamera, applyCameraTransform } from "./components/camera/camera.js";

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  applyCameraTransform(ctx);
  drawBoxes();
  drawPlayer();
  drawFlashlight();
  movePlayer(keys);
}

function updateFlashlightRotation(e) {
  const playerCenterX = canvas.width / 2;
  const playerCenterY = canvas.height / 2;
  const dx = e.clientX - playerCenterX;
  const dy = e.clientY - playerCenterY;
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
