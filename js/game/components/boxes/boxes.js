import { ctx } from "../../ctx.js";

export const boxes = [
  { x: 200, y: 200, width: 100, height: 100 },
  { x: 400, y: 150, width: 150, height: 150 },
];

export function drawBoxes() {
  ctx.fillStyle = "grey";
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