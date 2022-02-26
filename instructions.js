// Instructions Screen game loop
function instructionScreen(){
	// Prevents pages from increasing infinitely
	let maxPage = 4;
	if (waveMessageDisplay > maxPage) waveMessageDisplay = maxPage;
	// Draw the Title Screen
	context.fillStyle = 'blue';
	context.fillRect(0,0, canvas.width, canvas.height);
	// Title Display
	context.fillStyle = 'gold';
	context.font = levelSelect.fontSize +'px Arial';
	context.fillText('How to Play', 210, 75);
	drawButton(backButton);
	// Instruction Text
	context.font = 'bold 40px Arial';
	context.fillStyle = 'gold';
	switch(waveMessageDisplay){
		case 0:
			context.fillText("Click on an option at the bottom of ", 50, cellSize*1.5);
			context.fillText("the screen to select the type of ", 50, cellSize*1.5 + 45 * 1);
			context.fillText("DEFENDER you want to place. ", 50, cellSize*1.5 + 45 * 2);

			context.fillText("Then click on the field to place your  ", 50, cellSize*1.5 + 45 * 4);
			context.fillText("DEFENDER. ", 50, cellSize*1.5 + 45 * 5);

			context.fillText("Make sure that you have enough GOLD ", 50, cellSize*1.5 + 45 * 7);
			context.fillText("to pay its cost!", 50, cellSize*1.5 + 45 * 8);
			break;
		case 1:
			context.fillText("Collect GOLD COINS that appear by ", 50, cellSize*1.5 + 45 * 0);
			context.fillText("touching them with your mouse.", 50, cellSize*1.5 + 45 * 1);
			context.fillText("You also get GOLD by defeating ENEMIES.", 50, cellSize*1.5 + 45 * 3);
			
			break;
		case 2:
			context.fillText("Need to get rid of a tower or some extra", 50, cellSize*1.5 + 45 * 0);
			context.fillText("destructive power?", 50, cellSize*1.5 + 45 * 1);
			
			context.fillText("DOUBLE_CLICK on a DEFENDER to make ", 50, cellSize*1.5 + 45 * 3);
			context.fillText("it SELF DESTRUCT.", 50, cellSize*1.5 + 45 * 4);
			
			context.fillText("This will remove the DEFENDER from", 50, cellSize*1.5 + 45 * 6);
			context.fillText("the field and damage nearby ENEMIES", 50, cellSize*1.5 + 45 * 7);
			context.fillText("for the DEFENDER's remaining health.", 50, cellSize*1.5 + 45 * 8);
			break;
		case 3:
			context.fillText("Each LEVEL consists of 10 WAVES of", 50, cellSize*1.5 + 45 * 0);
			context.fillText("ENEMIES. A new WAVE will spawn after", 50, cellSize*1.5 + 45 * 1);
			context.fillText("a certain amount of time, but ", 50, cellSize*1.5 + 45 * 2);
			context.fillText("clicking the RUSH WAVE button will", 50, cellSize*1.5 + 45 * 3);
			context.fillText("make the next wave come right away!", 50, cellSize*1.5 + 45 * 4);
			
			context.fillText("Be careful, because if you run out", 50, cellSize*1.5 + 45 * 6);
			context.fillText("of health or the timer runs out,", 50, cellSize*1.5 + 45 * 7);
			context.fillText("it's GAME OVER.", 50, cellSize*1.5 + 45 * 8);
			break;
		case 4:
			context.fillText("You score points based on how many", 50, cellSize*1.5 + 45 * 0);
			context.fillText("enemies you defeat, and how much ", 50, cellSize*1.5 + 45 * 1);
			context.fillText("time and health you have remaining", 50, cellSize*1.5 + 45 * 2);
			
			context.fillText("Defeat all 10 WAVES to win!", 50, cellSize*1.5 + 45 * 4);
			context.fillText("", 50, cellSize*1.5 + 45 * 5);
			break;
			
		case 5:
			context.fillText("", 50, cellSize*1.5 + 45 * 0);
			context.fillText("", 50, cellSize*1.5 + 45 * 1);
			context.fillText("", 50, cellSize*1.5 + 45 * 2);
			context.fillText("", 50, cellSize*1.5 + 45 * 3);
			context.fillText("", 50, cellSize*1.5 + 45 * 4);
			break;
	}
	// Display the page number
	context.fillText("" + (waveMessageDisplay + 1), 430, cellSize*7 - 20);

	// Next/Previous buttons
	if (waveMessageDisplay != maxPage) drawButton(nextButton);
	if (waveMessageDisplay != 0) drawButton(previousButton);

	if (select === -2) requestAnimationFrame(instructionScreen);
}

// Goes to title screen on click
function back_press(){
	if (collision(mouse, backButton)) goToTitle();
}

// Goes to Instructions Screen on Click
function instruction_press(){
    if (collision(mouse, titleButton3)){
        goToInstructionScreen();
    }
}

// Prepare and run Instructions Screen
function goToInstructionScreen(){
    select = -2;
    waveMessageDisplay = 0;
    clearEvents();
    addInstructionEvents();
    instructionScreen();    
}

// Goes to next page on click
function next_press(){
	if (collision(mouse, nextButton)){
		waveMessageDisplay++;
	}
}

// Goes to previous page on click
function previous_press(){
	if (collision(mouse, previousButton)){
		waveMessageDisplay--;
		if (waveMessageDisplay < 0) waveMessageDisplay = 0;
	}
}

// Initiate Event Listeners for Instructions Screen
function addInstructionEvents(){
    canvas.addEventListener('click', back_press);
	canvas.addEventListener('click', next_press);
	canvas.addEventListener('click', previous_press);
}

// Terminate Event Listeners for Instructions Screen
function removeInstructionEvents(){
    canvas.removeEventListener('click', back_press);	
    canvas.removeEventListener('click', next_press);
    canvas.removeEventListener('click', previous_press);
}
