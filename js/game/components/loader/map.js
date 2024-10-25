import { ctx } from "../../ctx.js";
import { getRandomInt } from "../helper/random.js";

const CHUNK_SIZE = 1000;
let loadedTerrainChunks = new Map();

function generateTerrainChunk(chunkX, chunkY) {
  return {
    floor: {
      x: chunkX * CHUNK_SIZE,
      y: chunkY * CHUNK_SIZE,
      width: CHUNK_SIZE,
      height: CHUNK_SIZE,
    },
  };
}

export function loadTerrainChunks(player) {
  const chunkX = Math.floor(player.x / CHUNK_SIZE);
  const chunkY = Math.floor(player.y / CHUNK_SIZE);

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const key = `${chunkX + i},${chunkY + j}`;
      if (!loadedTerrainChunks.has(key)) {
        loadedTerrainChunks.set(
          key,
          generateTerrainChunk(chunkX + i, chunkY + j)
        );
      }
    }
  }
}

export function drawTerrainChunks(player) {
  const chunkX = Math.floor(player.x / CHUNK_SIZE);
  const chunkY = Math.floor(player.y / CHUNK_SIZE);

  for (let [key, chunk] of loadedTerrainChunks) {
    const [x, y] = key.split(",").map(Number);
    if (Math.abs(chunkX - x) <= 1 && Math.abs(chunkY - y) <= 1) {
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fillRect(
        chunk.floor.x,
        chunk.floor.y,
        chunk.floor.width,
        chunk.floor.height
      );
    }
  }
}
