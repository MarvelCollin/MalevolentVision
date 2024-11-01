export const ghostSetting = {
    scale : 3,
    speed : 4,
}

export const playerSetting = {
    scale : 3,
    speed : 5,
    maxAmmo : 50,
    shootCooldown : 200,
    dashSpeed : 20,
    dashDuration : 200,
    dashCooldown : 500,
}

export const flashlightSetting = {
    angle : Math.PI / 10,
    radius : 700,
    isOn : true,
    steps : 80,
    rotationSpeed : 0.05
}

export const map = {
    chunkSize : 1000
}

export async function loadAssets() {
  const response = await fetch("../assets/assets_connector.json");
  const assets = await response.json();

  return assets; 
}
