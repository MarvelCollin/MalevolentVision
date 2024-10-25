import { ctx, canvas } from "../../../ctx.js";
import { isPointInBox } from "../../boxes/boxes.js";
import { player } from '../../../game.js';
import { ghost } from '../../../game.js';


export let flashlight = {
  angle: Math.PI / 10,
  radius: 700,
  rotation: 0,
};

export function drawFlashlight(keys) {
  if (keys) {
    if (keys["ArrowLeft"]) {
      flashlight.rotation -= 0.05;
    } else if (keys["ArrowRight"]) {
      flashlight.rotation += 0.05;
    }
  }

  const centerX = player.x + player.width / 4;
  const centerY = player.y + player.height / 2;
  let ghostHit = false;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);

  const steps = 700;
  const angleStep = (flashlight.angle * 2) / steps;

  for (let i = -flashlight.angle; i < flashlight.angle; i += angleStep) {
    const angle = flashlight.rotation + i;
    let x = centerX;
    let y = centerY;

    for (let r = 0; r < flashlight.radius; r += 1) {
      let nextX = centerX + r * Math.cos(angle);
      let nextY = centerY + r * Math.sin(angle);
      
      if (ghost.isPointInGhost(nextX, nextY)) {
        ghostHit = true;
        ghost.color = "green";
        // break;
      }

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

  if (!ghostHit) {
    // ghost.color = "rgba(0,0,0,0)";
    ghost.color = "red";
  }

  ctx.lineTo(centerX, centerY);
  ctx.closePath();

  ctx.fillStyle = "rgba(182, 189, 12, 0.5)";
  ctx.fill();

  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";
}