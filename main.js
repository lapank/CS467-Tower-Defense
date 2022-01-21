
function main(){
	context.clearRect(0,0,canvas.width,canvas.height);
	
	
}

function animate(){
	context.clearRect(0,0,canvas.width,canvas.height);
	context.fillStyle = 'blue';
	context.fillRect(0,0,controlBar.width, controlBar.height);
	handleGameGrid();
	handleTowers();
	handleProjectiles();
	handleEnemies();
	handleResources();
	handleGameStatus();
	frame++;
	if(!gameOver)requestAnimationFrame(animate); // creates recursive loop that redraws animation
}
animate();
