// Place Tower on Click
function placeTower(){
	const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
	const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
	// Prevent Tower placement on Menu bar
	if(gridPositionY < cellSize || gridPositionY > canvas.height - cellSize) return;
	// Prevent Tower placement on existing Tower.
	for (let i=0; i<towers.length; i++){
		if(towers[i].x === gridPositionX && towers[i].y === gridPositionY){
			return;
		}
	}
	// Place Tower and deduct Resources
	if (numberOfResources >= towerCost){

		if (towerSelector == 1){
			towers.push(new Archer(gridPositionX, gridPositionY));
		}
		else if (towerSelector == 2) {
			towers.push(new Dragon(gridPositionX, gridPositionY));
		}
		else if (towerSelector == 3) {
			towers.push(new Wizard(gridPositionX, gridPositionY));
		} else {
			console.log('Error: towerSelector value is not between 1 and 3.');
		}

		numberOfResources -= towerCost;
	}
}

// Update existing Towers
function updateTowers(){
	for(let i = 0; i < towers.length; i++){
		towers[i].draw();
		towers[i].update();
		// Disable Tower when no Enemies (and when dying)
		if(enemyPositions.indexOf(towers[i].y) !== -1 && !towers[i].dying){
			towers[i].shooting = true;
		}else{
			towers[i].shooting = false;
		}
		// Handle Collision with Enemy
		for(let j = 0; j < enemies.length; j++){
			if (towers[i] && collision(towers[i], enemies[j])){
				enemies[j].movement = 0;

				//Only deal damage to living towers
				if (towers[i].health > 0){
					// Damage dealt varies by enemy
					if (enemies[j] instanceof Goblin){
						towers[i].health -= 0.2; 
					}
					else if (enemies[j] instanceof Vampire){
						towers[i].health -= 0.4; 
					}
					else if (enemies[j] instanceof Troll){
						towers[i].health -= 0.8; 
					}
				}
				
			}
			// Handle Tower Death  
			//Trigger dying state (death animation)
			if (towers[i] && towers[i].health <= 0){
				towers[i].dying = true;
				towers[i].shooting = false;
				enemies[j].movement = enemies[j].speed;
			}
			//Finally remove defeated tower from the towers array
			if (towers[i] && towers[i].dead){
				towers.splice(i, 1);
				i--;
			}
		}
	}
}

// Sacrifice a tower and damage all enemies in surrounding squares.
function explodeTower(i){
	// Retrieve tower stats
	let towerX = towers[i].x;
	let towerY = towers[i].y;
	let towerHealth = Math.floor(towers[i].health); 
	// Set explosion range to 3*3 square with tower as center
	let explodeRange = {
		x:towerX - cellSize, 
		y:towerY - cellSize, 
		width:cellSize*3 - cellGap*2, 
		height:cellSize*3 - cellGap*2
	};
	// Damage all enemies within tower range
	for (let j=0; j<enemies.length; j++){
		if (collision(explodeRange, enemies[j])){
			enemies[j].health -= towerHealth;
		}			
	}
	// Reduce tower health to zero
	towers[i].health = 0;
}
