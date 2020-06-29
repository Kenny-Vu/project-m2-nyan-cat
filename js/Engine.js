// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    //we have to keep track of all projectiles so we can destroy them when needed
    this.projectiles = [];
    //we add a start button to start game
    this.button = startButton(this.root);
    this.score = scoreTxt(this.root);
    this.hpBar = displayLives(this.root);
    this.hp = 100;
    this.bgm = new Sound(
      "/sounds/Abstraction - Three Red Hearts - Penguin Town.wav"
    );
    this.laserSfx = new Sound("sounds/sf_laser_13.mp3");
    this.bossMusic = new Sound(
      "/sounds/Abstraction - Three Red Hearts - Save the City.wav"
    );
    this.bossLevel = false;
    this.finalBoss = new Boss(this.root);
    // We add the background image to the game
    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }
    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.projectiles.forEach((shot) => {
      shot.update(timeDiff);
    });
    this.projectiles = this.projectiles.filter((shot) => {
      return !shot.destroyed;
    });
    this.projectiles.forEach((shot) => {
      checkCollision(this.projectiles, this.enemies);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
      //if player scores above a certain score, then stop the game
      if (SCORE > 100) {
        this.enemies.forEach((enemy) => {
          enemy.shot = true;
          this.bgm.stopMusic();
          this.bossLevel = true;
          this.bossMusic.playMusic();
          return;
        });
      }
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      return;
    }
    if (this.bossLevel) {
      this.finalBoss.domElement.style.opacity = "100";
    }
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    const gameTimer = setTimeout(this.gameLoop, 20);
  };

  //function to check if player died
  isPlayerDead = () => {
    let playerDead = false;
    let playerHealth = this.hpBar;
    this.enemies.forEach((foe) => {
      if (
        foe.y + ENEMY_HEIGHT - ENEMY_MARGIN > gameEngine.player.y &&
        foe.y + ENEMY_RAINBOW < gameEngine.player.y + PLAYER_HEIGHT &&
        foe.x === gameEngine.player.x
      ) {
        foe.shot = true;
        this.hp -= 20;
        playerHealth.style.width = `${this.hp}%`;
        if (this.hp < 40) {
          playerHealth.style.backgroundColor = "red";
        }
        if (this.hp === 0) {
          playerDead = true;
        }
      }
    });
    return playerDead;
  };
}
