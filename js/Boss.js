class Boss {
  constructor(theRoot) {
    this.root = theRoot;
    this.timePassed = 0;
    this.x = 7.5 * PLAYER_WIDTH;
    this.y = 0;
    this.lives = 100;

    this.domElement = document.createElement("img");
    this.domElement.style.height = `${BOSS_HEIGHT}PX`;
    this.domElement.style.width = `${BOSS_WIDTH}PX`;
    this.domElement.style.left = ` ${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.src = "images/boss.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.opacity = "0";
    this.domElement.style.transitionDuration = "4s";

    this.root.appendChild(this.domElement);
  }
  update = (timeDiff) => {
    this.timePassed += timeDiff;
    if (this.timePassed > 3000) {
      this.timePassed = 0;
      if (this.domElement.style.left === "200px") {
        this.x = 1000;
        this.domElement.style.left = `${this.x}px`;
      } else {
        this.x = 200;
        this.domElement.style.left = `${this.x}px`;
      }
    }
  };
}
