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
const maxPlayerHealth = 10;
let canvasPosition = canvas.getBoundingClientRect();
let gridSelect = true;
let playerHealth = maxPlayerHealth;
let waveMessageDisplay = 0;
let rushWave = false;
let adjustInterval = 0;

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