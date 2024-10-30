import { playerSetting } from "../../../setting.js";

export class PlayerMovement {
  constructor(player) {
    this.player = player;
    this.dashSpeed = playerSetting.dashSpeed;
    this.dashDuration = playerSetting.dashDuration;
    this.dashing = false;
    this.dashStartTime = 0;
    this.dashDirection = { x: 0, y: 0 };
    this.dashCooldown = playerSetting.dashCooldown;
    this.lastDashTime = 0;
    this.dashShadowOpacity = 0.5;
    this.keySequence = {};
    this.doublePressThreshold = 250;


  }



  getDashSpeed(){
    return this.dashSpeed;
  }

  getDashDuration(){
    return this.dashDuration;
  }

  getDashing(){
    return this.dashing;
  }

  getDashStartTime(){
    return this.dashStartTime;
  }

  getDashDirection(){
    return this.dashDirection;
  }

  getDashCooldown(){
    return this.dashCooldown;
  }

  getlastDashTime(){
    return this.lastDashTime;
  }

  getKeySequence(){
    return this.keySequence;
  }

  getDoublePressThreshold(){
    return this.doublePressThreshold;
  }

  handleMouseDown(event) {
    if (event.button === 0) {
      this.shoot();
    }
  }

  handleMouseMove(event) {
    this.updateAngle(event);
  }

  handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const currentTime = Date.now();

    if (["w", "a", "s", "d"].includes(key)) {
      if (!this.keySequence[key] ) {
        this.keySequence[key] = { count: 0, lastKeyUpTime: 0 };
      }

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

    if (key === "r") {
      this.reload();
    }
  }

  handleKeyUp(event) {
    const key = event.key.toLowerCase();
    const currentTime = Date.now();

    if (["w", "a", "s", "d"].includes(key)) {
      if (this.keySequence[key]) {
        this.keySequence[key].lastKeyUpTime = currentTime;
      }
    }
  }

  dash(direction) {
    const currentTime = Date.now();
    console.log("aaaaa")
    if (currentTime - this.lastDashTime >= this.dashCooldown) {
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

    const currentDashingTime = Date.now();
    if (this.dashing) {
      if (currentDashingTime - this.dashStartTime <= this.dashDuration) {
        this.player.x += this.dashDirection.x * this.dashSpeed;
        this.player.y += this.dashDirection.y * this.dashSpeed;
      } else {
        this.dashing = false;
      }
    }
  }


  
}
