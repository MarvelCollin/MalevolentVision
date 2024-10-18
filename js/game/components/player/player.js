import { canvas, ctx } from "../../ctx.js";

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

export function movePlayer(keys) {
  if (keys["w"]) player.y -= player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["d"]) player.x += player.speed;
}
