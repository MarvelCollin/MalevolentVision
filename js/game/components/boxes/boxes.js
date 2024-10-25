import { ctx } from "../../ctx.js";
import { getRandomInt } from "../helper/random.js";

const CHUNK_SIZE = 1000;

let loadedChunks = new Map();

// Global array to store all boxes
export let boxes = [];

// Function to generate a chunk with boxes
function generateChunk(chunkX, chunkY) {
  const chunkBoxes = Array.from({ length: 4 }, () => {
    const box = {
      x: chunkX * CHUNK_SIZE + getRandomInt(0, CHUNK_SIZE),
      y: chunkY * CHUNK_SIZE + getRandomInt(0, CHUNK_SIZE),
      width: getRandomInt(50, 200),
      height: getRandomInt(50, 200),
    };
    // Add the box to the global boxes array
    boxes.push(box);
    return box;
  });
  return chunkBoxes;
}

export function loadChunks(player) {
  const chunkX = Math.floor(player.x / CHUNK_SIZE);
  const chunkY = Math.floor(player.y / CHUNK_SIZE);

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const key = `${chunkX + i},${chunkY + j}`;
      if (!loadedChunks.has(key)) {
        const chunk = generateChunk(chunkX + i, chunkY + j);
        loadedChunks.set(key, chunk);
      }
    }
  }
}

export function drawBoxes(player) {
  const chunkX = Math.floor(player.x / CHUNK_SIZE);
  const chunkY = Math.floor(player.y / CHUNK_SIZE);

  for (let [key, chunkBoxes] of loadedChunks) {
    const [x, y] = key.split(",").map(Number);
    if (Math.abs(chunkX - x) <= 1 && Math.abs(chunkY - y) <= 1) {
      ctx.fillStyle = "rgba(255, 255, 2, 1)";
      chunkBoxes.forEach((box) => {
        ctx.fillRect(box.x, box.y, box.width, box.height);
      });
    }
  }
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
