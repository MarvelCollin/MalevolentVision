import { ctx } from "../../../ctx.js";

export class PlayerRendering {
  constructor(player) {
    this.player = player;
    this.dashShadowOpacity = 0.5;
    this.currentFrame = 0;
    this.sprites = [];
  }

  async drawPlayer() {
    this.player.shooting.bullets.forEach((bullet) => bullet.draw());
    this.drawDashShadow();

    if (this.sprites.length === 0) {
      this.sprites = await this.player.getAssets().getPlayer();
    }

    this.currentFrame = this.currentFrame % this.sprites.walk.left.length;
    const currentPlayerSpriteSrc = this.sprites.walk.left[this.currentFrame];
    const currentPlayerSprite = await this.loadImage(currentPlayerSpriteSrc);
    // console.log(currentPlayerSprite)

    ctx.drawImage(
      currentPlayerSprite,
      this.player.x - (this.player.width * 3) / 2,
      this.player.y - (this.player.height * 3) / 2,
      this.player.width * 3,
      this.player.height * 3
    );

    this.currentFrame++;
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

  async drawGun() {
    ctx.save();
    const playerCenterX = this.player.x + this.player.width / 2;
    const playerCenterY = this.player.y + this.player.height / 2;
    ctx.translate(playerCenterX, playerCenterY);
    ctx.rotate(this.player.angle);
    const gunImageSrc = await this.player.getAssets().getGun();
    const gunImage = await this.loadImage(gunImageSrc.default);

    ctx.drawImage(
      gunImage,
      -gunImage.width / 2,
      -gunImage.height / 2,
      gunImage.width * 3,
      gunImage.height * 3
    );
    ctx.restore();
  }

  async loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  }
}
