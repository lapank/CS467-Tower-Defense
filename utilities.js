let gameOver = false;
const winningScore = 50;

// utilities
function handleGameStatus(){
	context.fillStyle = 'gold';
	context.font = '30px Orbitron';
	context.fillText('Score: ' + score, 20, 45);
	context.fillText('Resources: ' + numberOfResources, 20, 80);
	if(gameOver){
		context.fillStyle = 'black';
		context.font = '90px Orbitron';
		context.fillText('GAME OVER', 135, 330);
	}
	if (score >= winningScore && enemies.length === 0){
		console.log('win met');
		context.fillStyle = 'black';
		context.font = '60px Orbitron';
		context.fillText('LEVEL COMPLETE', 130, 300);
		context.font = '30px Orbitron';
		context.fillText('You win with ' + score + ' points!', 134, 340);
	}
}

function collision(first, second){
	if (	!(	first.x > second.x + second.width ||
				first.x + first.width < second.x ||
				first.y > second.y + second.height ||
				first.y + first.height < second.y
			 )

		){ return true;}
}

//fix mouse offset if browser window is resized
window.addEventListener('resize', function(){
	canvasPosition = canvas.getBoundingClientRect();
});