//grid game
//make an empty array to fill with an object, loop through all the members of that array to create the animation, call draw function from animate function

const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d'); //access to all 2d drawing library tools
canvas.width = 900;
canvas.height = 600;

// global variables
const cellSize = 100;
const cellGap = 3;
let towerCost = 100;
let numberOfResources = 400;
let enemiesInterval = 600;
let frame = 0; //for periodic enemy spawn, and resource spawn
let gameOver = false;
let score = 0;
const winningScore = 50;

const gameGrid = [];
const towers = [];
const enemies = [];
const enemyPositions = [];
const projectiles = [];
const resources = [];



//mouse
const mouse = {
	x: 10,
	y: 10,
	width: 0.1,
	height:0.1,
}
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e){
	mouse.x = e.x - canvasPosition.left;
	mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener('mouseleave', function(){
	mouse.x = undefined;
	mouse.y = undefined;
})

// gameboard
const controlBar = {
	width: canvas.width,
	height: cellSize
}
class Cell{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = cellSize;
		this.height = cellSize;
	}
	draw(){
		if(mouse.x && mouse.y && collision(this, mouse)){
			context.strokeStyle = "#FF0000";
			context.strokeRect(this.x, this.y, this.width, this.height);
		}
		
	}
}
//console.log(context.strokeStyle);
function createGrid(){
	for (let y = cellSize; y < canvas.height; y+=cellSize){
		for (let x=0; x < canvas.width; x += cellSize){
			gameGrid.push(new Cell(x, y));
		}
	}
}
createGrid();
function handleGameGrid(){
	for (let i = 0; i < gameGrid.length; i++) {
		gameGrid[i].draw();
	}
}

// projectiles
class Projectile {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.power = 20;
		this.speed = 5;
	}
	update(){
		this.x += this.speed;
	}
	draw(){
		context.fillStyle = 'black';
		context.beginPath();
		context.arc(this.x,this.y, this.width, 0, Math.PI * 2);
		context.fill();
	}
}
function handleProjectiles(){
	for(let i = 0; i < projectiles.length; i++){
		projectiles[i].update();
		projectiles[i].draw();

		//projectiles remove enemy health and disappear when they colide.
		for (let j = 0; j < enemies.length; j++){
			if(enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])){
				enemies[j].health -= projectiles[i].power; //projectile hurts enemy
				projectiles.splice(i, 1); //remove this 
				i--;
			}
		}

		if(projectiles[i] && projectiles[i].x > canvas.width - cellSize){
			projectiles.splice(i, 1);
			i--;
		}
		//console.log('projectiles length ' + projectiles.length);
	}
}

// towers
class Tower{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.shooting = false;
		this.health = 100;
		this.timer = 0;
	}
	draw(){
		context.fillStyle = 'gold';
		context.fillRect(this.x,this.y,this.width,this.height);
		context.fillStyle = 'black';
		context.font = '30px Orbitron';
		context.fillText(Math.floor(this.health),this.x + 15, this.y + 30);
	}
	update(){
		if(this.shooting){
			this.timer++;
			if(this.timer % 100 === 0){
				projectiles.push(new Projectile(this.x + 70, this.y + 50))
			}
		}else{
			this.timer = 0;
		}
		
	}
}
canvas.addEventListener('click',function(){
	const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
	const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
	if(gridPositionY < cellSize) return;
	for (let i=0; i<towers.length; i++){
		if(towers[i].x === gridPositionX && towers[i].y === gridPositionY){
			return;
		}
	}//before placeing tower, check that there already is one with the same coordinates
	let towerCost = 100;
	if (numberOfResources >= towerCost){
		towers.push(new Tower(gridPositionX, gridPositionY));
		numberOfResources -= towerCost;
	}
});
function handleTowers(){
	for(let i = 0; i < towers.length; i++){
		towers[i].draw();
		towers[i].update();
		if(enemyPositions.indexOf(towers[i].y) !== -1){//check if enemy is on row, -1 means no value found in array
			towers[i].shooting = true;
		}else{
			towers[i].shooting = false;
		}
		
		for(let j = 0; j < enemies.length; j++){//check for enemy collision
			if (towers[i] && collision(towers[i], enemies[j])){
				enemies[j].movement = 0;
				towers[i].health -= 0.2; //remove health if enemy collides with tower
			}
			if (towers[i] && towers[i].health <= 0){
				towers.splice(i, 1);
				i--;
				enemies[j].movement = enemies[j].speed;
			}
		}
	}
}


// enemies
class Enemy{
	constructor(verticalPosition){
		this.x = canvas.width;
		this.y = verticalPosition;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.speed = Math.random()*0.2+0.4;
		this.movement = this.speed;
		this.health = 100;
		this.maxHealth = this.health; //will award player resources based on how large the HP was
	}
	update(){
		this.x -= this.movement; //walking right to left
	}
	draw(){
		context.fillStyle = 'red';
		context.fillRect(this.x, this.y, this.width, this.height);
		context.fillStyle = 'blue';
		context.font = '30px Orbitron';
		context.fillText(Math.floor(this.health),this.x + 15, this.y + 30);
	}
}
function handleEnemies(){
	for(let i = 0; i < enemies.length; i++){
		enemies[i].update(); //move to left
		enemies[i].draw(); //health and sprite
		if(enemies[i].x < 0){
			gameOver = true;
		}
		if (enemies[i].health <= 0){
			let gainedResources = enemies[i].maxHealth/10;
			numberOfResources += gainedResources;
			score += gainedResources; 
			const findThisIndex = enemyPositions.indexOf(enemies[i].y);
			enemyPositions.splice(findThisIndex, 1);
			enemies.splice(i, 1);
			i--;
			//console.log(enemyPositions);
		}
	}
	if (frame% enemiesInterval === 0 && score < winningScore){ //adding enemies to board
		let verticalPosition = Math.floor(Math.random()*5 +1) * cellSize + cellGap; //placing enemies on rows
		enemies.push(new Enemy(verticalPosition));
		enemyPositions.push(verticalPosition);
		if (enemiesInterval > 120) enemiesInterval -= 100;
		//console.log(enemyPositions);
	}
}

// resources
const amounts = [20,30,40];
class Resource {
	constructor(){
		this.x = Math.random() * (canvas.width - cellSize);
		this.y = (Math.floor(Math.random() *5)+1) *cellSize+25;
		this.width = cellSize * 0.6;
		this.height = cellSize * 0.6;
		this.amount = amounts[Math.floor(Math.random()*amounts.length)];
	}
	draw(){
		context.fillStyle = 'yellow';
		context.fillRect(this.x, this.y, this.width, this.height);
		context.fillStyle = 'black';
		context.font = '20px Orbitron';
		context.fillText(this.amount, this.x+15, this.y+25);
	}
}
function handleResources(){
	if(frame % 500 === 0 && score < winningScore){
		resources.push(new Resource());
	}
	for(let i = 0; i < resources.length; i++){
		resources[i].draw();
		if(resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)){
			numberOfResources += resources[i].amount;
			resources.splice(i, 1);
			i--;
		}
	}
}

// utilities
function handleGameStatus(){
	context.fillStyle = 'gold';
	context.font = '30px Orbitron';
	context.fillText('Score: ' + score, 20, 45);
	context.fillText('Resources: ' + numberOfResources, 20, 80);
	if(gameOver){
		context.fillStyle = 'black';
		context.font = '90px Orbitron';
		context.fillText('GAME OVER', 135, 330);
	}
	if (score >= winningScore && enemies.length === 0){
		console.log('win met')
		context.fillStyle = 'black';
		context.font = '60px Orbitron';
		context.fillText('LEVEL COMPLETE', 130, 300);
		context.font = '30px Orbitron';
		context.fillText('You win with ' + score + ' points!', 134, 340);
	}
}

function animate(){
	context.clearRect(0,0,canvas.width,canvas.height);
	context.fillStyle = 'blue';
	context.fillRect(0,0,controlBar.width, controlBar.height);
	handleGameGrid();
	handleTowers();
	handleProjectiles();
	handleEnemies();
	handleResources()
	handleGameStatus();
	frame++;
	//console.log('frame = ' + frame);
	if(!gameOver)requestAnimationFrame(animate); // creates recursive loop that redraws animation
}
animate();

function collision(first, second){
	if (	!(	first.x > second.x + second.width ||
				first.x + first.width < second.x ||
				first.y > second.y + second.height ||
				first.y + first.height < second.y
			 )

		){ return true;};
};

//fix mouse offset if browser window is resized
window.addEventListener('resize', function(){
	canvasPosition = canvas.getBoundingClientRect();
})

