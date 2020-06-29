class Boss {
  constructor(theRoot) {
    this.root = theRoot;
    // this.laser = document.createElement("img");
    // this.laser.src = "imagespower4.png";

    this.domElement = document.createElement("img");
    this.domElement.style.height = "400px";
    this.domElement.style.left = ` ${7.5 * PLAYER_WIDTH}px`;
    this.domElement.src = "images/boss.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.opacity = 0;
    this.domElement.style.transitionDuration = "2s";

    this.root.appendChild(this.domElement);
  }
}
