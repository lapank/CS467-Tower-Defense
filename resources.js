let score = 0;
const resources = [];		// array of existing resources
const amounts = [20,30,40]; // array of possible resource ammounts
const interval = 500		// How often resources appear

// Resource that can be picked up by moving over with a mouse.
class Resource {
	constructor(){
		// Assign random x/y location
		this.x = Math.random() * (canvas.width - cellSize);
		this.y = (Math.floor(Math.random() *5)+1) *cellSize+25;
		// Select random amount
		this.amount = amounts[Math.floor(Math.random()*amounts.length)];
		this.width = cellSize * 0.6;
		this.height = cellSize * 0.6;
	}
	draw(){
		context.fillStyle = 'yellow';
		context.fillRect(this.x, this.y, this.width, this.height);
		context.fillStyle = 'black';
		context.font = '20px Orbitron';
		context.fillText(this.amount, this.x+15, this.y+25);
	}
}

// Update Resources
function updateResources(){
	// Place Resources at a regular interval
	if(frame % interval === 0 && score < winningScore){
		resources.push(new Resource());
	}
	for(let i = 0; i < resources.length; i++){
		resources[i].draw();
		// Check collision with mouse to pick up resources
		if(resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)){
			numberOfResources += resources[i].amount;
			resources.splice(i, 1);
			i--;
		}
	}
}