// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById("app"));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === "KeyA") {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "KeyD") {
    gameEngine.player.moveRight();
  }
  if (event.code === "KeyK") {
    fireProjectile(gameEngine.root, gameEngine.player.x, gameEngine.player.y);
    gameEngine.laserSfx.reloadMusic();
    gameEngine.laserSfx.playMusic();
  }
};
//We store the gameloop method inside this function that will also hide the start button
const startGame = () => {
  gameEngine.button.style.opacity = "0";
  setTimeout(function () {
    gameEngine.button.style.display = "none";
    document.addEventListener("keydown", keydownHandler);
    gameEngine.bgm.playMusic();
    gameEngine.gameLoop();
  }, 1500);
};
// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.

// We add an event listener to the button in which we call the startGame function
gameEngine.button.addEventListener("click", startGame);
