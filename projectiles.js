const projectiles = [];

class Projectile {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.power = 20;
		this.speed = 5;
	}
	update(){
		this.x += this.speed;
	}
	draw(){
		context.fillStyle = 'black';
		context.beginPath();
		context.arc(this.x,this.y, this.width, 0, Math.PI * 2);
		context.fill();
	}
}
function handleProjectiles(){
	for(let i = 0; i < projectiles.length; i++){
		projectiles[i].update();
		projectiles[i].draw();

		//projectiles remove enemy health and disappear when they colide.
		for (let j = 0; j < enemies.length; j++){
			if(enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])){
				enemies[j].health -= projectiles[i].power; //projectile hurts enemy
				projectiles.splice(i, 1); //remove this 
				i--;
			}
		}

		if(projectiles[i] && projectiles[i].x > canvas.width - cellSize){
			projectiles.splice(i, 1);
			i--;
		}
		//console.log('projectiles length ' + projectiles.length);
	}
}