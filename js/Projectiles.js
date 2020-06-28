class Projectile {
  constructor(theRoot, playerPositionX, playerPositionY) {
    this.root = theRoot;

    //projectile's position depends on player's position
    this.x = playerPositionX + PLAYER_WIDTH / 2.5;
    this.y = playerPositionY - PLAYER_WIDTH;
    //when projectile leaves screen or collides with enemy, it is destroyed
    this.destroyed = false;
    this.speed = 0.5;

    this.domElement = document.createElement("img");
    this.domElement.src = "./images/beam1.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.top = this.y;
    this.domElement.style.left = this.x;
    this.domElement.style.zIndex = "4";

    this.root.appendChild(this.domElement);
  }
  update = (timeDiff) => {
    this.y -= timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;
    if (this.domElement.style.top < `0px`) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  };
}
