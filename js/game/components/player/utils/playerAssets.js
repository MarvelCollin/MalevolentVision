import { loadAssets } from "../../../setting.js";

export class PlayerAssets {
  constructor(player) {
    this.player = player;
    this.assets = this.initAssets();
  }

  async initAssets() {
    return await loadAssets();
  }
}
