import { ctx } from "../../ctx.js";
import { getRandomInt } from "../helper/random.js";
import { map } from "../../setting.js";
import { ASSETS } from "./assets.js";

const CHUNK_SIZE = map.chunkSize;
const VIEW_DISTANCE = 3;
const COMPONENTS_PER_CHUNK = 5;
const TILE_SIZE = 30;
export const COMPONENT_SCALE = 2; 
let loadedTerrainChunks = new Map();
let previousChunkX = null;
let previousChunkY = null;

const imageCache = {};

function preloadImage(src) {
  if (imageCache[src]) return imageCache[src];
  const img = new Image();
  img.src = src;
  imageCache[src] = img;
  return img;
}

function getRandomAsset() {
  const allAssets = [];
  for (let type in ASSETS.FLOOR) {
    const assets = ASSETS.FLOOR[type];
    if (Array.isArray(assets)) {
      allAssets.push(...assets);
    } else {
      allAssets.push(assets);
    }
  }
  return allAssets[getRandomInt(0, allAssets.length - 1)];
}

function getRandomTerrainTile() {
  const terrainAssets = ASSETS.FLOOR.TERRAIN;
  return terrainAssets[getRandomInt(0, terrainAssets.length - 1)];
}

function generateTerrainChunk(chunkX, chunkY) {
  const terrainTiles = [];
  for (let i = 0; i < CHUNK_SIZE; i += TILE_SIZE) {
    for (let j = 0; j < CHUNK_SIZE; j += TILE_SIZE) {
      const terrainAsset = getRandomTerrainTile();
      terrainTiles.push({
        asset: preloadImage(terrainAsset),
        x: chunkX * CHUNK_SIZE + i,
        y: chunkY * CHUNK_SIZE + j,
      });
    }
  }

  const components = [];
  for (let i = 0; i < COMPONENTS_PER_CHUNK; i++) {
    const componentAsset = getRandomAsset();
    const xOffset = getRandomInt(0, CHUNK_SIZE - TILE_SIZE);
    const yOffset = getRandomInt(0, CHUNK_SIZE - TILE_SIZE);
    components.push({
      asset: preloadImage(componentAsset),
      x: chunkX * CHUNK_SIZE + xOffset,
      y: chunkY * CHUNK_SIZE + yOffset,
    });
  }

  return {
    terrainTiles,
    components,
  };
}

export function loadTerrainChunks(player) {
  const chunkX = Math.floor(player.x / CHUNK_SIZE);
  const chunkY = Math.floor(player.y / CHUNK_SIZE);

  if (chunkX === previousChunkX && chunkY === previousChunkY) return;

  previousChunkX = chunkX;
  previousChunkY = chunkY;

  for (let i = -VIEW_DISTANCE; i <= VIEW_DISTANCE; i++) {
    for (let j = -VIEW_DISTANCE; j <= VIEW_DISTANCE; j++) {
      const key = `${chunkX + i},${chunkY + j}`;
      if (!loadedTerrainChunks.has(key)) {
        loadedTerrainChunks.set(key, generateTerrainChunk(chunkX + i, chunkY + j));
      }
    }
  }

  for (let key of loadedTerrainChunks.keys()) {
    const [x, y] = key.split(",").map(Number);
    if (Math.abs(chunkX - x) > VIEW_DISTANCE || Math.abs(chunkY - y) > VIEW_DISTANCE) {
      loadedTerrainChunks.delete(key);
    }
  }
}

export function drawTerrainChunks(player) {
  const chunkX = Math.floor(player.x / CHUNK_SIZE);
  const chunkY = Math.floor(player.y / CHUNK_SIZE);
  const visibleWidth = ctx.canvas.width;
  const visibleHeight = ctx.canvas.height;
  const playerOffsetX = player.x - visibleWidth / 2;
  const playerOffsetY = player.y - visibleHeight / 2;

  for (let [key, chunk] of loadedTerrainChunks) {
    const [x, y] = key.split(",").map(Number);
    if (Math.abs(chunkX - x) <= VIEW_DISTANCE && Math.abs(chunkY - y) <= VIEW_DISTANCE) {
      chunk.terrainTiles.forEach(tile => {
        if (
          tile.x + TILE_SIZE > playerOffsetX &&
          tile.y + TILE_SIZE > playerOffsetY &&
          tile.x < playerOffsetX + visibleWidth &&
          tile.y < playerOffsetY + visibleHeight
        ) {
          ctx.drawImage(
            tile.asset,
            tile.x,
            tile.y,
            TILE_SIZE,
            TILE_SIZE
          );
        }
      });

      chunk.components.forEach(component => {
        if (
          component.x + TILE_SIZE * COMPONENT_SCALE > playerOffsetX &&
          component.y + TILE_SIZE * COMPONENT_SCALE > playerOffsetY &&
          component.x < playerOffsetX + visibleWidth &&
          component.y < playerOffsetY + visibleHeight
        ) {
          ctx.drawImage(
            component.asset,
            component.x,
            component.y,
            component.asset.naturalWidth * COMPONENT_SCALE,
            component.asset.naturalHeight * COMPONENT_SCALE
          );
        }
      });
    }
  }
}

export function getNearbyComponents(player, radius) {
  const nearbyComponents = [];
  for (let [key, chunk] of loadedTerrainChunks) {
    chunk.components.forEach(component => {
      const dx = component.x - player.x;
      const dy = component.y - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= radius) {
        nearbyComponents.push(component);
      }
    });
  }
  return nearbyComponents;
}

