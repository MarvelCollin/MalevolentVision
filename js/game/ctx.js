export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

resizeCanvas();

export function resizeCanvas() {
  canvas.width = window.innerWidth ;
  canvas.height = window.innerHeight ;
}
