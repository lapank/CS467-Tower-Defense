let enemiesInterval = 600;
let frame = 0; //for periodic enemy spawn, and resource spawn
const enemies = [];
const enemyPositions = [];

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