lavaInterval = 600; 	
const lavaTarget = [];
const lavaBall = [];
const lavaPosition = [];
const lava = new Image();
lava.src = 'sprites/lava.png';

class Lava{
	constructor(horizontalPosition){
		this.x = Math.random() * (canvas.width - cellSize);
		this.y = 100;
		this.targetY = (Math.floor(Math.random() *5)+1) *cellSize+25;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.speed = 0.4;
		this.movement = this.speed;

		this.frameX = 0;//# of frames in sprite sheet
		this.frameY = 0; //1st row of sprite sheet
		this.minFrame = 0;
		this.maxFrame = 1;
		this.spriteWidth = 136;
		this.spriteHeight = 136;
	}
	update(){
		this.y += this.movement; //walking right to left
		if(frame % 5 === 0){
			if (this.frameX < this.maxFrame) this.frameX++;
			else this.frameX = this.minFrame;
		}
	}
	draw(){
		context.fillStyle = 'rgba(255, 0, 0, 0.5)';
		context.fillRect(this.x, this.y, this.width, this.height);
		//context.drawImage(lava, this.x, this.y, this.spriteWidth, this.spriteHeight);
		//context.drawImage(lava, this.x, this.y, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);

		context.drawImage(lava, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
	}
}

function updateLava(){
	for( let i = 0; i < lavaTarget.length; i++){
		lavaTarget[i].draw();
		lavaTarget[i].update();
		
			if (lavaTarget[i].y > lavaTarget[i].targetY){
			// Remove lava row position from the array 
			const findThisIndex = lavaPosition.indexOf(lavaTarget[i].x);
			lavaPosition.splice(findThisIndex, 1);
			lavaTarget.splice(i, 1);
			i--;
		}
	}
	spawnLava();
}


function spawnLava(){
	if (frame % lavaInterval === 0 && victory === false){ 
		// Determine column position
		let horizontalPosition = Math.floor(Math.random()*9 +1) * cellSize + cellGap;
		// Add random lava to lava array
			lavaBall.push(new FireBall(this.x + 55, this.y + 40));
			lavaTarget.push(new Lava(horizontalPosition));

	
		// Add enemy row position to the array
		lavaPosition.push(horizontalPosition);

		// Speed up rate that enemies appear.
		if (lavaInterval > 120) lavaInterval -= 100;
	}
}
