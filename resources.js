let score = 0;
const resources = [];
const amounts = [20,30,40];
class Resource {
	constructor(){
		this.x = Math.random() * (canvas.width - cellSize);
		this.y = (Math.floor(Math.random() *5)+1) *cellSize+25;
		this.width = cellSize * 0.6;
		this.height = cellSize * 0.6;
		this.amount = amounts[Math.floor(Math.random()*amounts.length)];
	}
	draw(){
		context.fillStyle = 'yellow';
		context.fillRect(this.x, this.y, this.width, this.height);
		context.fillStyle = 'black';
		context.font = '20px Orbitron';
		context.fillText(this.amount, this.x+15, this.y+25);
	}
}
function handleResources(){
	if(frame % 500 === 0 && score < winningScore){
		resources.push(new Resource());
	}
	for(let i = 0; i < resources.length; i++){
		resources[i].draw();
		if(resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)){
			numberOfResources += resources[i].amount;
			resources.splice(i, 1);
			i--;
		}
	}
}