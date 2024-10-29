import { ctx } from "../../../ctx.js";

export class PlayerRendering {
  constructor(player) {
    this.player = player;
    this.dashShadowOpacity = 0.5;
    console.log(this.player.shooting.bullets)
  }

  drawPlayer() {
    this.player.shooting.bullets.forEach((bullet) => bullet.draw());
    this.drawDashShadow();
    console.log()
    console.log("aaa", this.player.assets);
    const currentPlayerSprite = new Image();
    currentPlayerSprite.src = this.player.assets.asset.player.walk.left[this.player.currentFrame];
    ctx.drawImage(
      currentPlayerSprite,
      this.player.x - (this.player.width * 3) / 2,
      this.player.y - (this.player.height * 3) / 2,
      this.player.width * 3,
      this.player.height * 3
    );
    this.drawGun();
  }

  drawDashShadow() {
    if (this.player.dashing) {
      ctx.save();
      ctx.globalAlpha = this.dashShadowOpacity;
      ctx.fillStyle = "black";
      ctx.fillRect(
        this.player.x,
        this.player.y,
        this.player.width,
        this.player.height
      );
      ctx.restore();
    }
  }

  drawGun() {
    ctx.save();
    const playerCenterX = this.player.x + this.player.width / 2;
    const playerCenterY = this.player.y + this.player.height / 2;
    ctx.translate(playerCenterX, playerCenterY);
    ctx.rotate(this.player.angle);
    ctx.drawImage(
      this.player.gunImage,
      -this.player.gunImage.width / 2,
      -this.player.gunImage.height / 2,
      this.player.gunImage.width * 3,
      this.player.gunImage.height * 3
    );
    ctx.restore();
  }
}
