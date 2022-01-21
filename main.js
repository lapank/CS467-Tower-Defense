
function main(){
	context.clearRect(0,0,canvas.width,canvas.height);
}

function animate(){
	context.clearRect(0,0,canvas.width,canvas.height);
	// Draw the Menu bar
	context.fillStyle = 'blue';
	context.fillRect(0,0,menuBar.width, menuBar.height);

	updateGameGrid();
	updateTowers();
	updateProjectiles();
	updateEnemies();
	updateResources();
	updateGameStatus();
	frame++;
	if(!gameOver)requestAnimationFrame(animate); // creates recursive loop that redraws animation
}

function addEvents(){
	canvas.addEventListener('mousemove', trackMouse);
	canvas.addEventListener('mouseleave', disableMouse);
	// Fix mouse offset when browser window resized
	window.addEventListener('resize', function(){
		canvasPosition = canvas.getBoundingClientRect();
});
}

function addBoardEvents(){
	canvas.addEventListener('click', placeTower);
}

createGrid();
addEvents();
addBoardEvents();
animate();

