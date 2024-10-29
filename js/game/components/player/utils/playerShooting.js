import { playerSetting } from "../../../setting.js";
import { Bullet } from "../tools/bullet.js";

export class PlayerShooting {
  constructor(player) {
    this.player = player;
    this.bullets = [];
    this.lastShotTime = 0;
    this.currentAmmo = playerSetting.maxAmmo;
  }

  handleMouseDown(event) {
    if (event.button === 0) this.shoot();
  }

  shoot() {
    const currentTime = Date.now();
    if (
      currentTime - this.lastShotTime >= playerSetting.shootCooldown &&
      this.currentAmmo > 0
    ) {
      const bullet = new Bullet(
        this.player.x + this.player.width / 2,
        this.player.y + this.player.height / 2,
        60,
        this.player.angle,
        3,
        3
      );
      this.bullets.push(bullet);
      this.currentAmmo--;
      this.lastShotTime = currentTime;
    }
  }

  reload() {
    this.currentAmmo = playerSetting.maxAmmo;
  }

  updateBullets(ghost) {
    this.bullets = this.bullets.filter((bullet) => bullet.active);
    this.bullets.forEach((bullet) => {
      bullet.update();
      if (ghost.isHit(bullet)) {
        ghost.disableForSeconds(3);
        bullet.active = false;
      }
    });
  }
}
