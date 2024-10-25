import { ctx, canvas } from '../../ctx.js';

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomWidthCanvas(){
    let min = Math.ceil(100);
    let max = Math.floor(canvas.width - 100);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomHeightCanvas() {
  let min = Math.ceil(100);
  let max = Math.floor(canvas.height - 100);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}