import { canvas, ctx } from "../../ctx.js";
import { boxes } from "../boxes/boxes.js";

export let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 50,
  height: 50,
  speed: 9,
};

export function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function willCollide(newX, newY) {
  const nextPosition = {
    x: newX,
    y: newY,
    width: player.width,
    height: player.height,
  };

  for (let box of boxes) {
    if (
      nextPosition.x < box.x + box.width &&
      nextPosition.x + nextPosition.width > box.x &&
      nextPosition.y < box.y + box.height &&
      nextPosition.y + nextPosition.height > box.y
    ) {
      return true;
    }
  }

  return false;
}

export function movePlayer(keys) {
  const newX = keys["a"]
    ? player.x - player.speed
    : keys["d"]
    ? player.x + player.speed
    : player.x;
  const newY = keys["w"]
    ? player.y - player.speed
    : keys["s"]
    ? player.y + player.speed
    : player.y;

  if (!willCollide(newX, player.y)) {
    player.x = newX;
  }
  if (!willCollide(player.x, newY)) {
    player.y = newY;
  }
}
