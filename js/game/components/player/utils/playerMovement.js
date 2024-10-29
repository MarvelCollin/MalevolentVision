import { playerSetting } from "../../../setting.js";

export class PlayerMovement {
  constructor(player, speed) {
    this.player = player;
    this.speed = speed;
    this.dashing = false;
    this.dashStartTime = 0;
    this.dashDirection = { x: 0, y: 0 };
    this.lastDashTime = 0;
    this.keySequence = {};
    this.doublePressThreshold = 250;
  }

  handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const currentTime = Date.now();

    if (["w", "a", "s", "d"].includes(key)) {
      if (!this.keySequence[key])
        this.keySequence[key] = { count: 0, lastKeyUpTime: 0 };
      if (
        currentTime - this.keySequence[key].lastKeyUpTime <=
        this.doublePressThreshold
      ) {
        this.keySequence[key].count++;
      } else {
        this.keySequence[key].count = 1;
      }
      if (this.keySequence[key].count === 2) {
        this.dash(key);
        this.keySequence[key].count = 0;
      }
    }
  }

  handleKeyUp(event) {
    const key = event.key.toLowerCase();
    const currentTime = Date.now();
    if (["w", "a", "s", "d"].includes(key)) {
      if (this.keySequence[key])
        this.keySequence[key].lastKeyUpTime = currentTime;
    }
  }

  dash(direction) {
    const currentTime = Date.now();
    if (currentTime - this.lastDashTime >= playerSetting.dashCooldown) {
      this.dashing = true;
      this.dashStartTime = currentTime;
      this.lastDashTime = currentTime;
      switch (direction) {
        case "w":
          this.dashDirection = { x: 0, y: -1 };
          break;
        case "a":
          this.dashDirection = { x: -1, y: 0 };
          break;
        case "s":
          this.dashDirection = { x: 0, y: 1 };
          break;
        case "d":
          this.dashDirection = { x: 1, y: 0 };
          break;
      }
    }
  }

  updatePosition() {
    const currentTime = Date.now();
    if (
      this.dashing &&
      currentTime - this.dashStartTime <= playerSetting.dashDuration
    ) {
      this.player.x += this.dashDirection.x * playerSetting.dashSpeed;
      this.player.y += this.dashDirection.y * playerSetting.dashSpeed;
    } else {
      this.dashing = false;
    }
  }
}
