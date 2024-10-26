// game.js
import { ctx, canvas } from "./ctx.js";
import { Ghost } from "./components/ghost/ghost.js";
import { Player } from "./components/player/player.js";
import { flashlight } from "./components/player/tools/flashlight.js";
import { keys, setupInput, clientMouse } from "./components/listener/input.js";
import {
  updateCamera,
  applyCameraTransform,
} from "./components/camera/camera.js";
import {
  loadTerrainChunks,
  drawTerrainChunks,
} from "./components/loader/map.js";
import { loadChunks, drawBoxes } from "./components/boxes/boxes.js";

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

  applyCameraTransform(ctx);

  
  loadTerrainChunks(player);
  drawTerrainChunks(player);
  loadChunks(player);
  drawBoxes(player);

  player.update(ghost);
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
