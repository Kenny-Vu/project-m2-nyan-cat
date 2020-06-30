class BossProjectiles {
  constructor(theRoot, bossY) {
    this.root = theRoot;
    this.timePassed = 0;
    this.destroyed = false;
    this.speed = 0.8;
    this.y = bossY;
    this.x = Math.floor(Math.random() * 1400);
    this.domElement = document.createElement("img");
    this.domElement.src = "images/bossShot1.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.height = "200px";
    this.domElement.style.width = "200px";
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
  };
}
