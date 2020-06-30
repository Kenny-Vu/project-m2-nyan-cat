// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function,
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
const nextEnemySpot = (enemies) => {
  // enemySpots will refer to the number of spots available (can you calculate it?)
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

  // To find out where to place an enemy, we first need to find out which are the spots available.
  // We don't want to place two enemies in the same lane. To accomplish this, we first create an
  // array with 5 elements (why 5?) and each element is false.
  // We then use forEach to iterate through all the enemies.
  // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
  // We can use this property to modify the spotsTaken array.
  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }

  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

// addBackground contains all the logic to display the starry background of the game.
// It is a variable that refers to a function.
// The function takes one parameter
// The parameter represents the DOM node to which we will add the background
const addBackground = (root) => {
  // We create a new img DOM node.
  const bg = document.createElement("img");
  // We set its src attribute and the height and width CSS attributes
  bg.src = "images/gameBackground.jpg";
  bg.style.height = `100%`;
  bg.style.width = `100%`;
  // We add it to the root DOM node

  // We don't want the enemies to go beyond the lower edge of the image
  // so we place a white div to hide the enemies after they reach the bottom.
  // To see what it does, you can comment out all the remaining lines in the function to see the effect.
  const whiteBox = document.createElement("div");
  //adding overflow to body to prevent scrolling
  // We put a high z-index so that the div is placed over all other DOM nodes
  whiteBox.style.zIndex = -1;
  whiteBox.style.position = "absolute";
  // whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `100%`;
  whiteBox.style.width = `100%`;
  whiteBox.style.background = "#fff";
  whiteBox.append(bg);
  root.append(whiteBox);
};
// function to create start button
const startButton = (root) => {
  let button = document.createElement("button");
  button.style.position = "absolute";
  button.style.width = "250px";
  button.style.height = "100px";
  button.style.zIndex = "10";
  button.style.top = "50%";
  button.style.left = "40%";
  button.style.fontSize = "1.25rem";
  button.style.transitionDuration = "2s";
  button.innerText = "START GAME";
  button.style.color = "#00308f";

  root.appendChild(button);
  return button;
};
//function to create text score
const scoreTxt = (root) => {
  let scoreBox = document.createElement("div");
  scoreBox.style.position = "absolute";
  scoreBox.style.color = "white";
  scoreBox.style.width = "220px";
  scoreBox.style.height = "80px";
  scoreBox.style.bottom = "0px";
  scoreBox.style.right = "40px";
  scoreBox.style.fontSize = "1.5rem";
  scoreBox.style.display = "flex";
  scoreBox.style.justifyContent = "center";
  scoreBox.style.alignItems = "center";
  scoreBox.style.zIndex = "6";
  scoreBox.innerText = `Score: ${SCORE}`;

  root.appendChild(scoreBox);
  return scoreBox;
};

const displayLives = (root) => {
  let healthBar = document.createElement("div");
  let health = document.createElement("span");
  healthBar.style.width = "150px";
  healthBar.style.height = "50px";
  healthBar.style.border = "white solid";
  healthBar.style.borderRadius = "6px";
  healthBar.style.position = "absolute";
  healthBar.style.bottom = "20px";
  healthBar.style.right = "220px";
  healthBar.style.zIndex = "6";
  health.style.width = "100%";
  health.style.height = "100%";
  health.style.position = "absolute";
  health.style.backgroundColor = "green";
  health.style.transitionDuration = "0.3s";
  healthBar.appendChild(health);
  root.appendChild(healthBar);
  return health;
};
//logic for firing beams
const fireProjectile = (theRoot, playerPositionX, playerPositionY) => {
  const beam = new Projectile(theRoot, playerPositionX, playerPositionY);
  gameEngine.projectiles.push(beam);
};
const bossFire = (theRoot, bossY, timeDiff) => {
  gameEngine.timePassed += timeDiff;
  if (gameEngine.timePassed > 1000) {
    gameEngine.timePassed = 0;
    const laser = new BossProjectiles(theRoot, bossY);
    gameEngine.bossShots.push(laser);
    return laser;
  }
};

//logic to check collision between enemies and beams
const checkCollision = (beamArr, enemyArr) => {
  beamArr.forEach(function (shot) {
    enemyArr.forEach(function (foe) {
      if (
        foe.y + ENEMY_HEIGHT - ENEMY_MARGIN > shot.y &&
        foe.x + ENEMY_WIDTH > shot.x &&
        foe.x < shot.x
      ) {
        shot.destroyed = true;
        foe.shot = true;
        SCORE += 10;
        gameEngine.score.innerText = `Score: ${SCORE}`;
      }
    });
  });
};
const checkBossShot = (beamArr, boss) => {
  beamArr.forEach(function (shot) {
    if (
      boss.y + BOSS_HEIGHT > shot.y &&
      boss.x + BOSS_WIDTH > shot.x &&
      boss.x < shot.x
    ) {
      shot.destroyed = true;
      SCORE += 10;
      gameEngine.score.innerText = `Score: ${SCORE}`;
      gameEngine.finalBoss.lives--;
    }
  });
};
