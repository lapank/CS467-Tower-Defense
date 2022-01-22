let enemiesInterval = 600;		// frames between enemy spawns
let frame = 0; 					// increment that determines resource/enemy spawns
const enemies = [];				// array of existing enemies
const enemyPositions = [];		// array of enemy vertical/row positions

// Enemies that advance on towers
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
	// Move the enemy
	update(){
		this.x -= this.movement; //walking right to left
	}
	// Draw the enemy
	draw(){
		context.fillStyle = 'red';
		context.fillRect(this.x, this.y, this.width, this.height);
		context.fillStyle = 'blue';
		context.font = '30px Orbitron';
		context.fillText(Math.floor(this.health),this.x + 15, this.y + 30);
	}
}

// Update existing Enemies
function updateEnemies(){
	for(let i = 0; i < enemies.length; i++){
		// Move and Draw enemy
		enemies[i].update();
		enemies[i].draw();
		// End game when enemy reaches left boundary
		if(enemies[i].x < 0){
			gameOver = true;
		}
		// Handle enemy Death
		if (enemies[i].health <= 0){
			// Increase player resources and score
			let gainedResources = enemies[i].maxHealth/10;
			numberOfResources += gainedResources;
			score += gainedResources; 
			// Remove enemy row position from the array 
			const findThisIndex = enemyPositions.indexOf(enemies[i].y);
			enemyPositions.splice(findThisIndex, 1);
			enemies.splice(i, 1);
			i--;
		}
	}
	spawnNewEnemies();
}

function spawnNewEnemies(){
	if (frame% enemiesInterval === 0 && score < winningScore){ 
		// Determine row position
		let verticalPosition = Math.floor(Math.random()*5 +1) * cellSize + cellGap;
		// Add enemy to enemies array
		enemies.push(new Enemy(verticalPosition));
		// Add enemy row position to the array
		enemyPositions.push(verticalPosition);
		// Speed up rate that enemies appear.
		if (enemiesInterval > 120) enemiesInterval -= 100;
	}
}