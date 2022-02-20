lavaInterval = 600; 	
const lava = [];
const lavaPosition = [];

class Lava{
	constructor(horizontalPosition){
		this.x = Math.random() * (canvas.width - cellSize);
		this.y = (Math.floor(Math.random() *5)+1) *cellSize+25;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.speed = 0.4;
		this.movement = this.speed;
	}
	draw(){
		context.fillStyle = 'rgba(255, 0, 0, 0.5)';
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}

function updateLava(){
	for( let i = 0; i < lava.length; i++){
		lava[i].draw();
	}
	spawnLava();
}


function spawnLava(){
	if (frame % lavaInterval === 0 && victory === false){ 
		// Determine column position
		let horizontalPosition = Math.floor(Math.random()*9 +1) * cellSize + cellGap;
		// Add random lava to lava array
			lava.push(new Lava(horizontalPosition));
			console.log("lava array");
			console.log(lava);
	
		// Add enemy row position to the array
		lavaPosition.push(horizontalPosition);
		console.log("lavaPosition array");
		console.log(lavaPosition);
		// Speed up rate that enemies appear.
		if (lavaInterval > 120) lavaInterval -= 100;
	}
}
