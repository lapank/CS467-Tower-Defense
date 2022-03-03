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
			// Decrease count of enemies in row 
			if (enemies[i].visible) enemyPositions[enemies[i].y] -= 1;
			// Remove Enemy from the array
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
		}

// Take enemyType, row, delay, quantity, and spacing. Place a line of enemies of specified length.
function placeEnemyLine(type, row, delay, quantity, spacing){
	for (let i=0; i<quantity; i++){
		placeEnemy(type, row, delay+(i*spacing) );
	}
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
				placeEnemy(Goblin, 1, 60*2)
				placeEnemy(Goblin, 3, 60*0)
				placeEnemy(Goblin, 5, 120*2)
				
				goblinRow = [1, 5, 2, 5, 1, 4, 1, 3]
				for (let i = 8; i < 16; i++){
					let j = goblinRow[i - 8]
					placeEnemy(Goblin, j, 120*i);
				}
				break;
			case 2:
				// Enemies in 2nd wave
				placeEnemy(Vampire, 2, 60*1);
				placeEnemy(Vampire, 3, 60*0);
				placeEnemy(Vampire, 4, 60*1);

				placeEnemy(Vampire, 1, 60*8);
				placeEnemy(Vampire, 1, 60*12);
				placeEnemy(Vampire, 1, 60*16);
				placeEnemy(Vampire, 4, 60*8);
				placeEnemy(Vampire, 4, 60*12);
				placeEnemy(Vampire, 4, 60*16);
				break;
			case 3:
				// Enemies in 3rd wave
				placeEnemy(Troll, 2, 60*0);
				placeEnemy(Troll, 3, 60*0);
				placeEnemy(Troll, 2, 60*4);
				placeEnemy(Troll, 3, 60*4);
				break;
			case 4:
				// Enemies in 4th wave
				placeEnemy(Goblin, 5, 60*3);
				placeEnemy(Goblin, 1, 60*5);
				placeEnemy(Vampire, 2, 60*8);
				placeEnemy(Vampire, 2, 60*9);
				placeEnemy(Vampire, 2, 60*10);

				placeEnemy(Vampire, 1, 60*14);
				placeEnemy(Vampire, 1, 60*15);
				placeEnemy(Vampire, 1, 60*16);

				placeEnemy(Goblin, 4, 60*17);
				placeEnemy(Vampire, 4, 60*16);
				placeEnemy(Vampire, 4, 60*17);
				placeEnemy(Vampire, 4, 60*18);

				placeEnemy(Goblin, 3, 60*17);
				placeEnemy(Vampire, 3, 60*16);
				placeEnemy(Goblin, 3, 60*19);
				placeEnemy(Vampire, 3, 60*22);
				placeEnemy(Vampire, 3, 60*23);
				placeEnemy(Vampire, 3, 60*24);
				placeEnemy(Vampire, 3, 60*32);
				break;
			case 5:
				// Enemies in 5th wave
				placeEnemy(Troll, 1, 60*3);
				placeEnemy(Troll, 1, 60*6);
				placeEnemy(Vampire, 1, 60*10)
				placeEnemy(Vampire, 1, 60*16)

				placeEnemy(Troll, 4, 60*3);
				placeEnemy(Troll, 4, 60*6);
				placeEnemy(Vampire, 4, 60*10);
				placeEnemy(Vampire, 4, 60*16);
				break;
			case 6:
				// Enemies in 6th wave
				for (let i=1; i <= 5; i++){
					for (let j=0; j<4; j++){
						placeEnemy(Goblin, i, 120*j);
					} 
					placeEnemy(Vampire, i, 120 * 8)
				}
				break;
			case 7:
				// Enemies in 7th wave
				for (let i=0; i<6; i++){
					let j = i % 3;
					placeEnemy(Vampire, 1+j, 60*1 + 200*i);
					placeEnemy(Vampire, 1+j, 60*2 + 200*i);
					placeEnemy(Vampire, 1+j, 60*3 + 200*i);
					placeEnemy(Vampire, 2+j, 60*3 + 200*i);
					placeEnemy(Vampire, 3+j, 60*1 + 200*i);
					placeEnemy(Vampire, 3+j, 60*2 + 200*i);
					placeEnemy(Vampire, 3+j, 60*3 + 200*i);	
				}
				break;
			case 8:
				// Enemies in 8th wave
				placeEnemy(SuperTroll, 3, 60*1); // Make these into super-fast Trolls
				placeEnemy(SuperTroll, 3, 60*2);
				placeEnemy(SuperTroll, 5, 60*6);
				placeEnemy(SuperTroll, 5, 60*7);
				placeEnemy(SuperTroll, 1, 60*2);
				placeEnemy(SuperTroll, 1, 60*3);
				break;
			case 9:
				// Enemies in 9th wave
				goblinRow = [1, 2, 5, 3, 4, 2, 4, 1];
				goblinDelay = [0, 2, 2, 5, 7, 12, 14, 16];
				for (let i = 0; i < 8; i++){
					placeEnemy(Goblin, goblinRow[i], 60 * goblinDelay[i]);
				}
				break;
			case 10:
				// Enemies in 10th wave
				goblinRow = [1, 2, 5, 3, 4, 2, 4, 1];
				goblinDelay = [0, 2, 2, 5, 7, 12, 14, 16];
				for (let i = 0; i < 8; i++){
					placeEnemy(Goblin, goblinRow[i], 60 * goblinDelay[i]);
				}

				placeEnemy(Vampire, 2, 60*8);
				placeEnemy(Vampire, 2, 60*10);
				placeEnemy(Vampire, 4, 60*8);
				placeEnemy(Vampire, 4, 60*10);
				placeEnemy(Vampire, 2, 60*8);
				placeEnemy(Vampire, 1, 60*18);
				placeEnemy(Vampire, 1, 60*19);
				placeEnemy(Vampire, 1, 60*20);
				placeEnemy(Vampire, 5, 60*27);
				placeEnemy(Vampire, 5, 60*28);
				placeEnemy(Vampire, 5, 60*29);
				placeEnemy(Troll, 2, 60*16);
				placeEnemy(Troll, 4, 60*16);
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
		//current_wave = 5;
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
				break;
			case 4:
				// Enemies in 4th wave
				placeEnemy(Goblin, 5, 120*1);
				placeEnemy(Goblin, 1, 120*3);
				placeEnemy(Goblin, 3, 120*5);
				placeEnemy(Goblin, 3, 120*7);
				placeEnemy(Goblin, 4, 120*9);
				placeEnemy(Goblin, 2, 120*11);
				placeEnemy(Goblin, 2, 120*13);
				placeEnemy(Goblin, 5, 120*15);
				break;
			case 5:
				// Enemies in 5th wave
				for (let i = 0; i < 11; i++){
					if (i%2 === 0) placeEnemy(Vampire, i % 5 + 1, 120*i);
					else {
						placeEnemy(Goblin, i % 5 + 1, 120*i);
						placeEnemy(Goblin, i % 5 + 1, 120*i + 120);	
					} 
				};
				break;
			case 6:
				// Enemies in 6th wave
				placeEnemy(Troll, 5, 60*3);
				placeEnemy(Troll, 1, 60*6);
				break;
			case 7:
				// Enemies in 7th wave
				for (let i = 1; i <= 5; i++){
					placeEnemy(Goblin, i, 120*1);
					placeEnemy(Goblin, i, 120*2);
				}
				break;
			case 8:
				// Enemies in 8th wave
				for (let i = 1; i <= 5; i++){
					placeEnemy(Goblin, i, 120*1);
					placeEnemy(Vampire, i, 120*6);
				}
				break;
			case 9:
				// Enemies in 9th wave
				for (let i = 1; i <= 7; i++){
					placeEnemy(Goblin, 2, 120*i);
					placeEnemy(Goblin, 4, 120*i);
				}
				break;
			case 10:
				// Enemies in 10th wave
				placeEnemy(Vampire, 2, 60*5);
				placeEnemy(Vampire, 4, 60*5);
				placeEnemy(Vampire, 3, 60*7)
				placeEnemy(Vampire, 3, 60*8)
				placeEnemy(Vampire, 3, 60*9);
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
				for (let i = 0; i <= 30; i += 10){
					placeEnemy(Goblin, 1, 60*0 + 60*i);
					placeEnemy(Goblin, 3, 60*1 + 60*i);
					placeEnemy(Goblin, 5, 60*2 + 60*i);

					placeEnemy(Goblin, 2, 60*4 + 60*i);
					placeEnemy(Goblin, 4, 60*5 + 60*i);
					placeEnemy(Goblin, 5, 60*6 + 60*i);

					placeEnemy(Goblin, 3, 60*8 + 60*i);
					placeEnemy(Goblin, 1, 60*9 + 60*i);
					placeEnemy(Goblin, 2, 60*10 + 60*i);
				}
				break;
			case 2:
				// Enemies in 2nd wave
				placeEnemy(Vampire, 2, 60*1);
				placeEnemy(Vampire, 3, 60*0);
				placeEnemy(Vampire, 4, 60*1);

				placeEnemy(Vampire, 1, 60*8);
				placeEnemy(Vampire, 2, 60*7);
				placeEnemy(Vampire, 3, 60*8);

				placeEnemy(Vampire, 3, 60*14);
				placeEnemy(Vampire, 4, 60*13);
				placeEnemy(Vampire, 5, 60*14);

				placeEnemy(Vampire, 2, 60*17);
				placeEnemy(Vampire, 3, 60*16);
				placeEnemy(Vampire, 4, 60*17);

				placeEnemy(Vampire, 1, 60*24);
				placeEnemy(Vampire, 2, 60*23);
				placeEnemy(Vampire, 3, 60*24);

				placeEnemy(Vampire, 3, 60*31);
				placeEnemy(Vampire, 4, 60*30);
				placeEnemy(Vampire, 5, 60*31);

				break;
			case 3:
				// Enemies in 3rd wave
				placeEnemy(Troll, 2, 60*0);
				placeEnemy(Troll, 3, 60*0);
				placeEnemy(Troll, 2, 60*1);
				placeEnemy(Troll, 3, 60*1);
				placeEnemy(Goblin, 1, 60*4);
				placeEnemy(Goblin, 4, 60*4);
				placeEnemy(Goblin, 5, 60*4);
				placeEnemy(Vampire, 1, 60*8);
				placeEnemy(Vampire, 4, 60*8);
				placeEnemy(Vampire, 5, 60*8);
				break;
			case 4:
				// Enemies in 4th wave
				for (let i=1; i <= 5; i++){
					for (let j=1; j<=8; j++){
						if (j % 3 === 0) placeEnemy(Vampire, i, 120*j);
						else placeEnemy(Goblin, i, 120*j);
					} 
				}
				break;
			case 5:
				// Enemies in 5th wave
				for (let i = 0; i <= 30; i += 10){
					placeEnemy(Goblin, 1, 60*0 + 60*i);
					placeEnemy(Vampire, 3, 60*1 + 60*i);
					placeEnemy(Goblin, 5, 60*2 + 60*i);

					placeEnemy(Goblin, 2, 60*4 + 60*i);
					placeEnemy(Goblin, 4, 60*5 + 60*i);
					placeEnemy(Vampire, 5, 60*6 + 60*i);

					placeEnemy(Goblin, 3, 60*8 + 60*i);
					placeEnemy(Troll, 1, 60*9 + 60*i);
					placeEnemy(Goblin, 2, 60*10 + 60*i);
				}
				break;
			case 6:
				// Enemies in 6th wave
				for (let i=1; i <= 5; i++){
					for (let j=1; j<=8; j++){
						if (j % 2 === 0) placeEnemy(Vampire, i, 120*j);
						else placeEnemy(Goblin, i, 120*j);
					} 
				}
				break;
			case 7:
				// Enemies in 7th wave
				for (let i = 0; i<3; i++){
					placeEnemy(Goblin, 1, 120*3 + i*120*5);
					placeEnemy(Goblin, 2, 120*2 + i*120*5);
					placeEnemy(Goblin, 3, 120*1 + i*120*5);
					placeEnemy(Goblin, 4, 120*2 + i*120*5);
					placeEnemy(Goblin, 5, 120*3 + i*120*5);
				}
				
				placeEnemyLine(Vampire, 4, 60*3, 3, 60);
				placeEnemyLine(Vampire, 1, 60*3, 5, 60);
				
				placeEnemyLine(Vampire, 2, 60*8, 3, 60);
				placeEnemyLine(Vampire, 3, 60*8, 4, 60);
				placeEnemyLine(Vampire, 1, 60*8, 2, 60);
				
				placeEnemyLine(Goblin, 5, 60*8, 3, 60);
				placeEnemyLine(Goblin, 1, 60*17, 3, 60);
				placeEnemyLine(Goblin, 4, 60*22, 3, 60);

				placeEnemyLine(Vampire, 5, 60*13, 3, 60);
				placeEnemyLine(Vampire, 1, 60*20, 3, 60);
				placeEnemyLine(Vampire, 4, 60*27, 3, 60);

				break;
			case 8:
				// Enemies in 8th wave
				placeEnemy(Troll, 2, 60*1);
				placeEnemy(Goblin, 4, 60*6);
				placeEnemy(Goblin, 1, 60*14);
				placeEnemy(Troll, 5, 60*20);

				placeEnemyLine(Vampire, 2, 60*3, 10, 60);
				placeEnemyLine(Vampire, 4, 60*8, 10, 60);
				placeEnemyLine(Vampire, 1, 60*16, 10, 60);
				placeEnemyLine(Vampire, 5, 60*25, 10, 60);
				break;
			case 9:
				// Enemies in 9th wave
				for (let i=0; i<6; i++){
					let j = i % 3;
					placeEnemy(Vampire, 1+j, 60*1 + 200*i);
					placeEnemy(Vampire, 1+j, 60*2 + 200*i);
					placeEnemy(Vampire, 1+j, 60*3 + 200*i);
					placeEnemy(Vampire, 2+j, 60*3 + 200*i);
					placeEnemy(Vampire, 3+j, 60*1 + 200*i);
					placeEnemy(Vampire, 3+j, 60*2 + 200*i);
					placeEnemy(Vampire, 3+j, 60*3 + 200*i);	
				}
				break;
			case 10:
				// Enemies in 10th wave
				lavaFieldWipe();
				for (let i=1; i <= 5; i++){
					for (let j=0; j<8; j++){
						placeEnemy(Vampire, i, 280 + 400*j);
						placeEnemy(Vampire, i, 280 + 400*j+60);
					} 
				}
				placeEnemy(Vampire, 1, 280 + 400*8);
				placeEnemy(Vampire, 1, 280 + 400*8+60);
				placeEnemy(Vampire, 1, 280 + 400*8+120);
				placeEnemy(Vampire, 5, 280 + 400*8);
				placeEnemy(Vampire, 5, 280 + 400*8+60);
				placeEnemy(Vampire, 5, 280 + 400*8+120);
				break;
		}
		waves -= 1;
	}
}
