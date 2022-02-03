// Update existing Enemies
function updateEnemies(){
	for(let i = 0; i < enemies.length; i++){
		// Move and Draw enemy
		enemies[i].update();
		enemies[i].draw();
		// Damage player when enemy reaches left boundary
		if(enemies[i].x < 0){
			// Damage player equal to enemy health, mark enemy for destruction.
			playerHealth -= enemies[i].health;
			if (playerHealth < 0) playerHealth = 0;
			enemies[i].health = 0;
			// End game if playerHealth depleted
			if (playerHealth <= 0) gameOver = true;
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
	if (frame% enemiesInterval === 0 && waves > 0){ 
		// Determine row position
		let verticalPosition = Math.floor(Math.random()*5 +1) * cellSize + cellGap;
		
		// Add random enemy to enemies array
		let enemySelector = Math.floor(Math.random() * (3 - 1 + 1) + 1);
		if (enemySelector == 1){
			enemies.push(new Goblin(verticalPosition));
		}
		else if (enemySelector == 2) {
			enemies.push(new Vampire(verticalPosition));
		}
		else{
			enemies.push(new Troll(verticalPosition));
		}
		
		// Add enemy row position to the array
		enemyPositions.push(verticalPosition);
		// Speed up rate that enemies appear.
		if (enemiesInterval > 120) enemiesInterval -= 100;
		waves -= 1;
	}
}