import { ctx, canvas } from "./ctx.js";
import { Ghost } from "./components/ghost/ghost.js";
import { Player } from "./components/player/player.js";
import { drawBoxes } from "./components/boxes/boxes.js";
import { flashlight } from "./components/player/tools/flashlight.js";
import { keys, setupInput, clientMouse } from "./components/listener/input.js";
import {
  updateCamera,
  applyCameraTransform,
} from "./components/camera/camera.js";

export let player = new Player(canvas.width / 2, canvas.height / 2, 50, 50, 5);
export let ghost = new Ghost(
  canvas.width / 2 - 100,
  canvas.height / 2 - 100,
  50,
  50,
  4,
  "red"
);

function updateHealthBar() {
  const healthBarFill = document.getElementById("health-bar-fill");
  healthBarFill.style.width = `${player.health}%`;
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(93, 91, 92, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  applyCameraTransform(ctx);

  drawBoxes();
  player.update();
  player.draw();
  player.move(keys);
  flashlight.draw(keys);
  ghost.update(player.x, player.y);
  ghost.draw();

  updateHealthBar();
}

setupInput();

function start() {
  updateCamera();
  flashlight.updateFlashlightRotation(clientMouse);
  drawScene();
  requestAnimationFrame(start);
}

start();
