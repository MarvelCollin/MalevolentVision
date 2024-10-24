import { ctx } from "../../ctx.js";
import {
  getRandomInt,
  randomWidthCanvas,
  randomHeightCanvas,
} from "../helper/helper.js";

export const boxes = Array.from({ length: 15 }, () => ({
  x: randomWidthCanvas(),
  y: randomHeightCanvas(),
  width: getRandomInt(50, 200), 
  height: getRandomInt(50, 200),
}));

export function drawBoxes() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  boxes.forEach((box) => {
    ctx.fillRect(box.x, box.y, box.width, box.height);
  });
}

export function isPointInBox(x, y) {
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    if (
      x >= box.x &&
      x <= box.x + box.width &&
      y >= box.y &&
      y <= box.y + box.height
    ) {
      return true;
    }
  }
  return false;
}
