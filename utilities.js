let gameOver = false;		// When True, game is lost.
const winningScore = 50;	// Points needed to win

// Update Menu display
function handleGameStatus(){
	// Menu Display
	context.fillStyle = 'gold';
	context.font = '30px Orbitron';
	// Current Score
	context.fillText('Score: ' + score, 20, 45);				 
	// Current Resources
	context.fillText('Resources: ' + numberOfResources, 20, 80); 
	// Checks for Game Over
	if(gameOver){
		context.fillStyle = 'black';
		context.font = '90px Orbitron';
		context.fillText('GAME OVER', 135, 330);
	}
	// Checks for win condition
	if (score >= winningScore && enemies.length === 0){
		console.log('win met');
		context.fillStyle = 'black';
		context.font = '60px Orbitron';
		context.fillText('LEVEL COMPLETE', 130, 300);
		context.font = '30px Orbitron';
		context.fillText('You win with ' + score + ' points!', 134, 340);
	}
}

// Take two game objects. Return true if they are colliding.
function collision(first, second){
	if (	!(	first.x > second.x + second.width ||
				first.x + first.width < second.x ||
				first.y > second.y + second.height ||
				first.y + first.height < second.y)
		) return true;
}
