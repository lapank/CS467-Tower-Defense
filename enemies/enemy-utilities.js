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

		//Handle Enemy Death
		if(enemies[i] && enemies[i].health <=0){
			// Start Death animation
			enemies[i].dying = true;
		
		}

		if(enemies[i] && enemies[i].dead){
			// Increase player resources and score
			let gainedResources = enemies[i].goldValue;
			numberOfResources += gainedResources;
			score += enemies[i].pointValue; 
			// Remove enemy row position from the array 
			const findThisIndex = enemyPositions.indexOf(enemies[i].y);
			enemyPositions.splice(findThisIndex, 1);
			enemies.splice(i, 1);
			i--;
		}
		
	}
	switch (select){
		case 1:
			spawnNewEnemies1();
			break;
		case 2:
			spawnNewEnemies2();
			break;
		case 3:
			spawnNewEnemies3();
	}
}

// Take a number between 1-5. Returns the coordinates of the corresponding vertical position of the row.
function eRow(num){
	if (num < 1 || 5 < num) num = 1;
	return num * cellSize + cellGap;
}

// Take an enemytype, row, and delay. Place an enemy record their position in enemy Positions.
function placeEnemy(type, row, delay){
			enemies.push(new type(eRow(row), delay));
			enemyPositions.push(eRow(row));
		}

// Takes a message and displays that message on the screen.
function displayBanner(msg){
	context.font = 'bold 80px Arial';
	// Add glow so readable on dark backgrounds 
	context.shadowColor="white";
	context.shadowBlur=15;
	// Write the Message
	context.fillStyle = 'black';
	context.fillText(msg, cellSize*3, cellSize*3);
	// Remove glow effect
	context.shadowBlur = 0;
}

function spawnNewEnemies1(){
	let current_wave = maxWaves + 1 - waves; // determines value of count wave 
	let timeIntoWave = ((frame + adjustInterval) % enemiesInterval);
	
	// Display a message when a new wave begins
	waveMessageDisplay--; 
	if (waveMessageDisplay > 0 && waves >= 0)	displayBanner("Wave " + (current_wave-1)); // Adjusts for wave decrease after trigger
	
	// Trigger next Wave
	if ((waves > 0) && (timeIntoWave === 0 || rushWave)){ 
		// Adjust timing of next wave to happen at the next enemiesInterval.
		if (rushWave) adjustInterval += enemiesInterval - timeIntoWave;
		rushWave = false;
		// Set Wave banner to display
		waveMessageDisplay = 60*3;
		// Divides enemies into waves
		switch(current_wave){
			case 1:
				// Enemies in 1st wave
				placeEnemy(Goblin, 1, 60*0);
				placeEnemy(Goblin, 3, 60*1);
				placeEnemy(Goblin, 5, 60*2);
				break;
			case 2:
				// Enemies in 2nd wave
				placeEnemy(Vampire, 2, 60*1);
				placeEnemy(Vampire, 3, 60*0);
				placeEnemy(Vampire, 4, 60*1);
				break;
			case 3:
				// Enemies in 3rd wave
				placeEnemy(Troll, 2, 60*0);
				placeEnemy(Troll, 3, 60*0);
				placeEnemy(Troll, 2, 60*1);
				placeEnemy(Troll, 3, 60*1);
				break;
			case 4:
				// Enemies in 4th wave
				placeEnemy(Goblin, 5, 60*3);
				break;
			case 5:
				// Enemies in 5th wave
				placeEnemy(Vampire, 2, 60*3);
				break;
			case 6:
				// Enemies in 6th wave
				placeEnemy(Troll, 5, 60*3);
				break;
			case 7:
				// Enemies in 7th wave
				placeEnemy(Goblin, 5, 60*3);
				break;
			case 8:
				// Enemies in 8th wave
				placeEnemy(Vampire, 2, 60*3);
				break;
			case 9:
				// Enemies in 9th wave
				placeEnemy(Troll, 5, 60*3);
				break;
			case 10:
				// Enemies in 10th wave
				placeEnemy(Vampire, 2, 60*3);
				break;
		}
		waves -= 1;
	}
}

function spawnNewEnemies2(){
	let current_wave = maxWaves + 1 - waves; // determines value of count wave 
	let timeIntoWave = ((frame + adjustInterval) % enemiesInterval);
	
	// Display a message when a new wave begins
	waveMessageDisplay--; 
	if (waveMessageDisplay > 0 && waves >= 0)	displayBanner("Wave " + (current_wave-1)); // Adjusts for wave decrease after trigger
	
	// Trigger next Wave
	if ((waves > 0) && (timeIntoWave === 0 || rushWave)){ 
		// Adjust timing of next wave to happen at the next enemiesInterval.
		if (rushWave) adjustInterval += enemiesInterval - timeIntoWave;
		rushWave = false; 
		// Set Wave banner to display
		waveMessageDisplay = 60*3;
		switch(current_wave){
			case 1:
				// Enemies in 1st wave
				placeEnemy(Goblin, 3, 60*1);
				placeEnemy(Goblin, 4, 60*2);
				placeEnemy(Goblin, 3, 60*6);
				placeEnemy(Goblin, 3, 60*8);
				placeEnemy(Goblin, 4, 60*12);
				placeEnemy(Goblin, 4, 60*14);
				placeEnemy(Goblin, 1, 60*18);
				placeEnemy(Goblin, 3, 60*20);
				break;
			case 2:
				// Enemies in 2nd wave
				placeEnemy(Vampire, 3, 60*0);
				placeEnemy(Vampire, 2, 60*1);
				placeEnemy(Vampire, 3, 60*1);
				placeEnemy(Vampire, 4, 60*1);
				placeEnemy(Vampire, 2, 60*2);
				placeEnemy(Vampire, 3, 60*2);
				placeEnemy(Vampire, 4, 60*2);

				placeEnemy(Vampire, 1, 60*10);
				placeEnemy(Vampire, 2, 60*10);
				placeEnemy(Vampire, 3, 60*10);
				placeEnemy(Vampire, 1, 60*11);
				placeEnemy(Vampire, 2, 60*11);
				placeEnemy(Vampire, 3, 60*11);

				placeEnemy(Vampire, 3, 60*20);
				placeEnemy(Vampire, 4, 60*20);
				placeEnemy(Vampire, 5, 60*20);
				placeEnemy(Vampire, 3, 60*21);
				placeEnemy(Vampire, 4, 60*21);
				placeEnemy(Vampire, 5, 60*21);
				break;
			case 3:
				// Enemies in 3rd wave
				placeEnemy(Troll, 2, 60*0);
				placeEnemy(Troll, 3, 60*0);
				placeEnemy(Troll, 2, 60*1);
				placeEnemy(Troll, 3, 60*1);
				break;
			case 4:
				// Enemies in 4th wave
				placeEnemy(Goblin, 5, 60*3);
				break;
			case 5:
				// Enemies in 5th wave
				placeEnemy(Vampire, 2, 60*3);
				break;
			case 6:
				// Enemies in 6th wave
				placeEnemy(Troll, 5, 60*3);
				break;
			case 7:
				// Enemies in 7th wave
				placeEnemy(Goblin, 5, 60*3);
				break;
			case 8:
				// Enemies in 8th wave
				placeEnemy(Vampire, 2, 60*3);
				break;
			case 9:
				// Enemies in 9th wave
				placeEnemy(Goblin, 3, 60*6);
				break;
			case 10:
				// Enemies in 10th wave
				placeEnemy(Vampire, 2, 60*3);
				break;
		}
		waves -= 1;
	}
}

function spawnNewEnemies3(){
	let current_wave = maxWaves + 1 - waves; // determines value of count wave 
	let timeIntoWave = ((frame + adjustInterval) % enemiesInterval);
	
	// Display a message when a new wave begins
	waveMessageDisplay--; 
	if (waveMessageDisplay > 0 && waves >= 0)	displayBanner("Wave " + (current_wave-1)); // Adjusts for wave decrease after trigger
	
	// Trigger next Wave
	if ((waves > 0) && (timeIntoWave === 0 || rushWave)){ 
		// Adjust timing of next wave to happen at the next enemiesInterval.
		if (rushWave) adjustInterval += enemiesInterval - timeIntoWave;
		rushWave = false;
		waveMessageDisplay = 60*3;
		switch(current_wave){
			case 1:
				// Enemies in 1st wave
				placeEnemy(Goblin, 1, 60*0);
				placeEnemy(Goblin, 3, 60*1);
				placeEnemy(Goblin, 5, 60*2);
				break;
			case 2:
				// Enemies in 2nd wave
				placeEnemy(Vampire, 2, 60*1);
				placeEnemy(Vampire, 3, 60*0);
				placeEnemy(Vampire, 4, 60*1);
				break;
			case 3:
				// Enemies in 3rd wave
				placeEnemy(Troll, 2, 60*0);
				placeEnemy(Troll, 3, 60*0);
				placeEnemy(Troll, 2, 60*1);
				placeEnemy(Troll, 3, 60*1);
				break;
			case 4:
				// Enemies in 4th wave
				placeEnemy(Goblin, 5, 60*3);
				break;
			case 5:
				// Enemies in 5th wave
				placeEnemy(Vampire, 2, 60*3);
				break;
			case 6:
				// Enemies in 6th wave
				placeEnemy(Troll, 5, 60*3);
				break;
			case 7:
				// Enemies in 7th wave
				placeEnemy(Goblin, 5, 60*3);
				break;
			case 8:
				// Enemies in 8th wave
				placeEnemy(Vampire, 2, 60*3);
				break;
			case 9:
				// Enemies in 9th wave
				placeEnemy(Troll, 5, 60*3);
				break;
			case 10:
				// Enemies in 10th wave
				placeEnemy(Vampire, 2, 60*3);
				break;
		}
		waves -= 1;
	}
}
