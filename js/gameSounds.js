class Sound {
  constructor(src) {
    this.domElement = document.createElement("audio");
    this.domElement.src = src;
  }
  playMusic = () => {
    this.domElement.play();
  };
  stopMusic = () => {
    this.domElement.pause();
  };
  reloadMusic = () => {
    this.domElement.load();
  };
}
