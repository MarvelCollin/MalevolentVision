import { loadAssets } from "../../../setting.js";

export class PlayerAssets {
  constructor(player) {
    this.player = player;
    this.assets = null;
    this.loadAssets();
  }

  async loadAssets() {
    if (!this.assets) {
      this.assets = await loadAssets();
    }
  }

  async getPlayer() {
    if (!this.assets) await loadAssets();

    return this.assets.player;
  }

  async getGun() {
    if (!this.assets) await loadAssets();

    return this.assets.gun;
  }
}
