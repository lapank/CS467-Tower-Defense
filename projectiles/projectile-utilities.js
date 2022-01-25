// Update existing Projectiles
function updateProjectiles(){
	for(let i = 0; i < projectiles.length; i++){
		projectiles[i].update();
		projectiles[i].draw();

		// Handle collision with Enemy
		for (let j = 0; j < enemies.length; j++){
			if(enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])){
				enemies[j].health -= projectiles[i].power; 	// damage enemy
				projectiles.splice(i, 1); 					// remove projectile 
				i--;
			}
		}
		// Remove projectile at end of game screen
		if(projectiles[i] && projectiles[i].x > canvas.width - cellSize){
			projectiles.splice(i, 1);
			i--;
		}
	}
}