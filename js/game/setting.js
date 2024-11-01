export const ghostSetting = {
    scale: 3,
    speed: 4,
}

export const playerSetting = {
    scale: 3,
    speed: 5,
    maxAmmo: 50,
    shootCooldown: 200,
    dashSpeed: 20,
    dashDuration: 200,
    dashCooldown: 500,
}

export const flashlightSetting = {
    angle: Math.PI / 10,
    radius: 700,
    isOn: true,
    steps: 80,
    rotationSpeed: 0.05
}

export const map = {
    chunkSize: 1000
}

export async function loadAssets() {
    const response = await fetch("../assets/assets_connector.json");
    const assets = await response.json();

    return assets;
}

export const DIRECTION = {
    UP: "UP",
    UP_LEFT: "UP_LEFT",
    UP_RIGHT: "UP_RIGHT",
    DOWN: "DOWN",
    DOWN_LEFT: "DOWN_LEFT",
    RIGHT_LEFT: "RIGHT_LEFT",
    RIGHT: "RIGHT",
    LEFT: "LEFT",
}

export const STATUS = {
    IDLE: "IDLE",
    WALK: "WALK",
    ATTACK1: "ATTACK1",
    ATTACK2: "ATTACK2",
    DASH: "DASH",
    DAMAGED: "DAMAGED"
}