let towerCost = 100;			// required resources to place a tower
let numberOfResources = 500;	// player's starting resources
const towers = [];				// array of existing towers

// Tower to shoot projectiles and destroy enemies
class Tower{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.shooting = false;
		this.health = 100;
		this.timer = 0;
		this.fireSpeed = 100;  // number of timer-frames between shots.
	}
	// Draw Tower on board
	draw(){
		context.fillStyle = 'gold';
		context.fillRect(this.x,this.y,this.width,this.height);
		context.fillStyle = 'black';
		context.font = '30px Orbitron';
		context.fillText(Math.floor(this.health),this.x + 15, this.y + 30);
	}
	// Increment timer and fire projectiles
	update(){
		if(this.shooting){
			this.timer++;
			if(this.timer % this.fireSpeed === 0){
				projectiles.push(new Projectile(this.x + 70, this.y + 50));
			}
		}
		// Reset timer if not shooting
		else{ 
			this.timer = 0;
		}
	}
}

// Place Tower on Click
function placeTower(){
	const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
	const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
	// Prevent Tower placement on Menu bar
	if(gridPositionY < cellSize) return;
	// Prevent Tower placement on existing Tower.
	for (let i=0; i<towers.length; i++){
		if(towers[i].x === gridPositionX && towers[i].y === gridPositionY){
			return;
		}
	}
	// Place Tower and deduct Resources
	if (numberOfResources >= towerCost){
		towers.push(new Tower(gridPositionX, gridPositionY));
		numberOfResources -= towerCost;
	}
}

// Update existing Towers
function updateTowers(){
	for(let i = 0; i < towers.length; i++){
		towers[i].draw();
		towers[i].update();
		// Disable Tower when no Enemies
		if(enemyPositions.indexOf(towers[i].y) !== -1){
			towers[i].shooting = true;
		}else{
			towers[i].shooting = false;
		}
		// Handle Collision with Enemy
		for(let j = 0; j < enemies.length; j++){
			if (towers[i] && collision(towers[i], enemies[j])){
				enemies[j].movement = 0;
				towers[i].health -= 0.2; 
			}
			// Handle Tower Death 
			if (towers[i] && towers[i].health <= 0){
				towers.splice(i, 1);
				i--;
				enemies[j].movement = enemies[j].speed;
			}
		}
	}
}