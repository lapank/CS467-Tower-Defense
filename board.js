// Game Screen attributes
const canvas = document.getElementById('game');
const context = canvas.getContext('2d'); //access to all 2d drawing library tools
canvas.width = 900;
canvas.height = 700;
//Lava Level
const lavaBackground = new Image();
lavaBackground.src = 'sprites/lava-background.jpg';
const grassBackground = new Image();
grassBackground.src = 'sprites/grass-background.jpg';

// Global Variables
const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const maxPlayerHealth = 200;			// Health player starts the level with.
const TIME_LIMIT = 60 * 4;			// Default time limit for a level
const MAX_RESOURCES = 200;
const TOWER_COST = 100;				// Tower Costs
const ARCHER_COST = 50;
const WIZARD_COST = 75;
const DRAGON_COST = 100;
const SLOW_TIME = 60 * 2;
const START_LAVA_INTERVAL = 600;
let canvasPosition = canvas.getBoundingClientRect();
let gridSelect = true;
let playerHealth = maxPlayerHealth;  // Player's current health
let waveMessageDisplay = 0;			 // Displays current wave when >0 
let rushWave = false;                // Sends next enemy wave when true
let adjustInterval = 0;				 // Accelerates next wave this many frames
let levelTime = TIME_LIMIT;			 // The actual time limit for the current level
let mins = 0;						 // Minute value on timer display
let secs = 0;              			 // Second value on timer display
let startTime = performance.now();   // The start time of the level

let highscore1 = 0; // Stored high scores for each level
let highscore2 = 0;
let highscore3 = 0;
let rank = 1;		// Rank must be >= Level-Number to play.

// Mouse position
const mouse = {
	x: 10,
	y: 10,
	width: 0.1,
	height:0.1,
};

// Menu Bar attributes
const menuBar = {
	width: canvas.width,
	height: cellSize,
};

// Cell representing Space on the board
class Cell{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = cellSize;
		this.height = cellSize;
	}
	// Highlight Cell on mouseover
	draw(){
		if(mouse.x && mouse.y && collision(this, mouse) && gridSelect){
			context.strokeStyle = "#FF0000";
			context.strokeRect(this.x, this.y, this.width, this.height);
		}
	}
}

// Overlay Canvas with Cells.
function createGrid(){
	for (let y = cellSize; y < canvas.height - cellSize; y+=cellSize){
		for (let x=0; x < canvas.width; x += cellSize){
			gameGrid.push(new Cell(x, y));
		}
	}
}

// Draw existing Cells
function updateGameGrid(){
	for (let i = 0; i < gameGrid.length; i++) {
		gameGrid[i].draw();
	}
}

function drawMenu(color){
	context.clearRect(0,0,canvas.width,canvas.height);
	// Draw the Menu bar
	context.fillStyle = color;
	context.fillRect(0,0, menuBar.width, menuBar.height);
	context.fillStyle = color;
	context.fillRect(0,600, menuBar.width, menuBar.height);
	drawButton(inGameQuitButton);
	drawButton(rushButton);
}

// Track Mouse click
function clickDown(e){
	mouse.clicked = true;
}

// Track Mouse click release
function clickUp(e){
	mouse.clicked = false;
}

// Track Mouse position on game screen
function trackMouse(e){
	mouse.x = e.x - canvasPosition.left;
	mouse.y = e.y - canvasPosition.top;
}

// Stop tracking Mouse position outside game screen
function disableMouse(){
	mouse.x = undefined;
	mouse.y = undefined;
}