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

		//Randomly select which tower to create (temporary for testing towers until tower menu is implemented)
		let towerSelector = Math.floor(Math.random() * (3 - 1 + 1) + 1);
		if (towerSelector == 1){
			towers.push(new Archer(gridPositionX, gridPositionY));
		}
		else if (towerSelector == 2) {
			towers.push(new Dragon(gridPositionX, gridPositionY));
		}
		else{
			towers.push(new Wizard(gridPositionX, gridPositionY));
		}

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
			// Handle Tower Death 
			if (towers[i] && towers[i].health <= 0){
				towers.splice(i, 1);
				i--;
				enemies[j].movement = enemies[j].speed;
			}
		}
	}
}