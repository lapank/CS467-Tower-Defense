let score = 0;
const resources = [];		// array of existing resources
const amounts = [10,20,30]; // array of possible resource ammounts
const interval = 500;		// How often resources appear

const coin = new Image();
coin.src = 'sprites/coin.png';
const poof = new Image();
poof.src = 'sprites/poof.png';


// Resource that can be picked up by moving over with a mouse.
class Resource {
	constructor(){
		// Assign random x/y location
		this.disappear = false;
		this.x = Math.random() * (canvas.width - cellSize);
		this.y = (Math.floor(Math.random() *5)+1) *cellSize+25;
		// Select random amount
		this.amount = amounts[Math.floor(Math.random()*amounts.length)];
		this.width = cellSize * 0.8;
		this.height = cellSize * 0.8;
		this.frameX = 13;//# of frames in sprite sheet
		this.frameY = 0; //1st row of sprite sheet
		this.minFrame = 0;
		this.maxFrame = 12;
		this.spriteWidth = 500;
		this.spriteHeight = 500;
		this.resourcePickup = this.maxFrame;
	}

	draw(){
		//Switch image is the resource has been moused over.
		if(this.resourcePickup === this.maxFrame){
			context.drawImage(coin, this.x, this.y, this.width, this.height);
		}else{
			context.drawImage(poof, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
		}
		//context.fillStyle = 'black';
		//context.font = '20px Orbitron';
		//context.fillText(this.amount, this.x+15, this.y+25);
		strokedText(this.amount.toString(), this.x+15, this.y+25, '20px', 'yellow');
	}

	update(){
		if(frame % 5 === 0){
			if (this.frameX < this.maxFrame) this.frameX++;
			else this.frameX = this.minFrame;
		}
	}
		
}

// Update Resources
function updateResources(){
	// Place Resources at a regular interval
	if(frame % interval === 0 && !(gameOver || victory)){
		resources.push(new Resource());
	}
	for(let i = 0; i < resources.length; i++){
		resources[i].draw();
		if(resources[i].resourcePickup < resources[i].maxFrame){ //Begin 'poof' animation and count down until complete.
			resources[i].update();
		}
		// Check collision with mouse to pick up resources
		if(resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)){
			resources[i].disappear = true; //Flag that this particular resource has been moused over.
		}
		if(resources[i].disappear){
			if(resources[i].resourcePickup === resources[i].maxFrame){ //Add coin value at beginning of countdown.
				numberOfResources += resources[i].amount;
				resources[i].resourcePickup --;
			}
			else if(frame % 5 === 0){ //Slow countdown so all frames can play.
				resources[i].resourcePickup --;
			}
			else if( resources[i].resourcePickup === 0){ //Remove resource from array when countdown is finished.
				resources.splice(i, 1);
				i--;
			}
		}
	}
}