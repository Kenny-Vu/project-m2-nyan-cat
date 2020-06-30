// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 1500;
const GAME_HEIGHT = 650;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 100;
const MAX_ENEMIES = 3;
//added these to remove game over from touching the rainbow or margin in front of nyan cat
const ENEMY_MARGIN = 10;
const ENEMY_RAINBOW = 80;
// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;
// These constants represent the projectile width and height.
const PROJECTILE_WIDTH = 10;
const PROJECTILE_HEIGHT = 20;
// boss'  height
const BOSS_HEIGHT = 400;
const BOSS_WIDTH = 300;
//laser dimensions
const LASER_HEIGHT = 200;
const LASER_WIDTH = 200;
// constant to store player's score
let SCORE = 0;
