import { ctx, canvas } from "./ctx.js";
import { Ghost } from "./components/entities/ghost.js";
import { Player } from "./components/entities/player.js";
import { drawBoxes } from "./components/boxes/boxes.js";
import { drawFlashlight, flashlight } from "./components/tools/flashlight.js";
import { keys, setupInput } from "./components/listener/input.js";
import { updateCamera, applyCameraTransform } from "./components/camera/camera.js";
import { randomHeightCanvas, randomWidthCanvas } from "./components/helper/helper.js";

export let player = new Player(canvas.width / 2, canvas.height / 2, 50, 50, 3);
export let ghost = new Ghost(randomWidthCanvas, randomHeightCanvas);

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(93, 91, 92, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  applyCameraTransform(ctx);
  drawBoxes();
  player.draw();
  drawFlashlight(keys);
  player.move(keys);
  console.log(player.x);
  ghost.draw();
  ghost.moveRandomly();
}

function updateFlashlightRotation(e) {
  const playerCenterX = canvas.width / 4;
  const playerCenterY = canvas.height / 4;
  const dx = e.clientX - playerCenterX;
  const dy = e.clientY - playerCenterY;
  flashlight.rotation = Math.atan2(dy, dx);
}

window.addEventListener("mousemove", updateFlashlightRotation);


setupInput();

function start() {
  updateCamera();
  player.move(keys);
  drawScene();
  requestAnimationFrame(start);
}

start();
