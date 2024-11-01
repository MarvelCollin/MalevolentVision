import { playerSetting } from "../../../setting.js";
import { ctx, canvas } from "../../../ctx.js";
import { Bullet } from "../tools/bullet.js";
import { ASSETS } from "../../loader/assets.js";

export class PlayerShooting {
  constructor(player) {
    this.player = player;

    this.bullets = [];
    this.gunImage = new Image();
    this.gunImage.src = ASSETS.WEAPON.GUN;
    this.maxAmmo = playerSetting.maxAmmo;
    this.currentAmmo = this.maxAmmo;
    this.lastShotTime = 0;
    this.shootCooldown = playerSetting.shootCooldown;
  }

  getGunImage() {
    return this.gunImage;
  }

  getMaxAmmo() {
    return this.maxAmmo;
  }

  getCurrentAmmo() {
    return this.currentAmmo;
  }

  getLastShotTime() {
    return this.lastShotTime;
  }

  getShootCooldown() {
    return this.shootCooldown;
  }

  handleMouseDown(event) {
    if (event.button === 0) {
      this.shoot();
    }
  }

  updateAngle(event) {
    const rect = canvas.getBoundingClientRect();
    const playerCenterX = canvas.width / 2;
    const playerCenterY = canvas.height / 2;
    const mouseX = event.clientX - playerCenterX;
    const mouseY = event.clientY - playerCenterY;
    const currentAngle = Math.atan2(mouseY, mouseX);
    this.player.setAngle(currentAngle);
  }

  handleMouseMove(event) {
    this.updateAngle(event);
  }

  shoot() {
    const currentTime = Date.now();
    if (
      currentTime - this.lastShotTime >= this.shootCooldown &&
      this.currentAmmo > 0
    ) {
      const bullet = new Bullet(
        this.x + this.width / 2,
        this.y + this.height / 2,
        60,
        this.player.getAngle(),
        3,
        3
      );
      this.bullets.push(bullet);
      this.currentAmmo--;
      this.lastShotTime = currentTime;
    }
  }

  reload() {
    this.currentAmmo = this.maxAmmo;
  }

  updateGun(ghost) {
    this.bullets = this.bullets.filter((bullet) => bullet.active);
    this.bullets.forEach((bullet) => {
      bullet.update();
      if (ghost.isHit(bullet)) {
        ghost.disableForSeconds(3);
        bullet.active = false;
      }
    });
  }

  drawEachBullet() {
    this.bullets.forEach((bullet) => bullet.draw());
  }

  drawGun() {
    ctx.save();

    const playerCenterX =
      this.player.getEntityX() + this.player.getEntityWidth() / 2;
    const playerCenterY =
      this.player.getEntityY() + this.player.getEntityHeight() / 2;

    ctx.translate(playerCenterX, playerCenterY);
    ctx.rotate(this.player.getAngle());

    // ctx.drawImage(
    //   this.gunImage,
    //   -this.gunImage.width ,
    //   -this.gunImage.height ,
    //   this.gunImage.width * 3,
    //   this.gunImage.height * 3
    // );

    ctx.restore();
  }
}
