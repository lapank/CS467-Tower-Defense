let towerCost = 100;
let numberOfResources = 400;
const towers = [];

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
				projectiles.push(new Projectile(this.x + 70, this.y + 50));
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