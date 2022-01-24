const projectiles = []; // Array to hold existing projectiles

// Projectiles fired by Towers
class Arrow {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.power = 20;
		this.speed = 5;
	}
	// Move the projectile
	update(){
		this.x += this.speed;
	}
	// Draw the projectile
	draw(){
		context.fillStyle = 'black';
		context.beginPath();
		context.arc(this.x,this.y, this.width, 0, Math.PI * 2);
		context.fill();
	}
}

// Fire Ball projectile for Dragon Towers
class FireBall {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.power = 50;
		this.speed = 5;
	}
	// Move the projectile
	update(){
		this.x += this.speed;
	}
	// Draw the projectile
	draw(){
		context.fillStyle = 'darkorange';
		context.beginPath();
		context.arc(this.x,this.y, this.width, 0, Math.PI * 2);
		context.fill();
	}
}

// Magic Bolt projectile for Wizard Towers
class MagicBolt {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.power = 10;
		this.speed = 5;
	}
	// Move the projectile
	update(){
		this.x += this.speed;
	}
	// Draw the projectile
	draw(){
		context.fillStyle = 'gold';
		context.beginPath();
		context.arc(this.x,this.y, this.width, 0, Math.PI * 2);
		context.fill();
	}
}

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
