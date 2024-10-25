import { canvas, resizeCanvas } from "../../ctx.js";

export const keys = {};
export let clientMouse = { x: 0, y: 0 };

export function setupInput() {
  window.addEventListener("keydown", function (e) {
    keys[e.key.toLowerCase()] = true;
  });

  window.addEventListener("keyup", function (e) {
    keys[e.key.toLowerCase()] = false;
  });

  window.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    clientMouse.x = event.clientX ;
    clientMouse.y = event.clientY ;
  });

  window.addEventListener("resize", resizeCanvas);
}
