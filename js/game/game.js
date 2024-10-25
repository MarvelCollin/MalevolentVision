import { ctx, canvas } from "./ctx.js";
import { Ghost } from "./components/ghost/ghost.js";
import { Player } from "./components/player/player.js";
import { drawBoxes } from "./components/boxes/boxes.js";
import {
  drawFlashlight,
  flashlight,
} from "./components/player/tools/flashlight.js";
import { keys, setupInput, clientMouse } from "./components/listener/input.js";
import {
  updateCamera,
  applyCameraTransform,
} from "./components/camera/camera.js";
import {
  randomHeightCanvas,
  randomWidthCanvas,
} from "./components/helper/random.js";

export let player = new Player(canvas.width / 2, canvas.height / 2, 50, 50, 12);
export let ghost = new Ghost(
  canvas.width / 2 - 100,
  canvas.height / 2 - 100,
  50,
  50,
  8,
  "red"
);

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(93, 91, 92, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  applyCameraTransform(ctx);
  drawBoxes();
  player.update();
  player.draw();
  player.move(keys);
  drawFlashlight(keys);
  ghost.update(player.x, player.y);
  ghost.draw();
}

function updateFlashlightRotation(e) {
  const playerCenterX = canvas.width / 4;
  const playerCenterY = canvas.height / 4;
  const dx = e.x - playerCenterX;
  const dy = e.y - playerCenterY;
  flashlight.rotation = Math.atan2(dy, dx);
}

setupInput();

function start() {
  updateCamera();
  updateFlashlightRotation(clientMouse);
  drawScene();
  requestAnimationFrame(start);
}

start();
