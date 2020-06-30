class BossProjectiles {
  constructor(theRoot, bossY) {
    this.root = theRoot;
    this.timePassed = 0;
    this.destroyed = false;
    this.speed = 0.8;
    this.shot = false;
    this.y = bossY;
    this.x = Math.floor(Math.random() * 1350);
    this.domElement = document.createElement("img");
    this.domElement.src = "images/bossShot1.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.height = `${LASER_HEIGHT}px`;
    this.domElement.style.width = `${LASER_WIDTH}px`;
    this.domElement.style.top = this.y;
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.zIndex = "4";

    this.root.appendChild(this.domElement);
  }
  update = (timeDiff) => {
    this.timePassed += timeDiff;
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;
    if (this.y > 550) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
    if (this.shot === true) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  };
}
