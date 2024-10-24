import { ctx, canvas } from "../../ctx.js";
import { player } from "../player/player.js";
import { isPointInBox } from "../boxes/boxes.js";

export let flashlight = {
  angle: Math.PI / 10,
  radius: 700,
  rotation: 0,
};

export function drawFlashlight(keys) {
  if(keys){

  }

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);

  let steps = 2000;
  for (
    let i = -flashlight.angle;
    i < flashlight.angle;
    i += (flashlight.angle * 2) / steps
  ) {
    let angle = flashlight.rotation + i;
    let x = centerX;
    let y = centerY;  

    for (let r = 0; r < flashlight.radius; r += 2) {
      let nextX = centerX + r * Math.cos(angle);
      let nextY = centerY + r * Math.sin(angle);

      if (isPointInBox(nextX, nextY)) {
        x = nextX;
        y = nextY;
        break;
      }

      x = nextX;
      y = nextY;
    }

    ctx.lineTo(x, y);
  }
  ctx.lineTo(centerX, centerY);
  ctx.closePath();

  ctx.fillStyle = "rgba(182, 189, 12, 0.5)";
  ctx.fill();

  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
  ctx.fillRect(0, 0, window.innerWidth, canvas.innerHeight);
  ctx.globalCompositeOperation = "source-over";
}

