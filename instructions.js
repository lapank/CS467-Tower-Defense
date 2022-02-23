// Instructions Screen game loop
function instructionScreen(){
	// Draw the Title Screen
	context.fillStyle = 'blue';
	context.fillRect(0,0, canvas.width, canvas.height);
	// Title Display
	context.fillStyle = 'gold';
	context.font = levelSelect.fontSize +'px Arial';
	context.fillText('Level Select', levelSelect.x, levelSelect.y);
	// Button Displays
	drawButton(levelButton1);
	context.drawImage(grassBackground, 40, 210, 256, 256);
	strokedText('Level 1', 50, 460, '70px', 'white');
	drawButton(levelButton2);
	strokedText('Level 2', 326, 460, '70px', 'white');
	drawButton(levelButton3);
	context.drawImage(lavaBackground, 592, 210, 256, 256);
	strokedText('Level 3', 602, 460, '70px', 'white');
	drawButton(saveQuitButton);
	drawButton(noSaveQuitButton);
	// Display High Scores
	drawHighScores();

	if (select === -2) requestAnimationFrame(levelSelectScreen);
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
    addInstructionEvents()
    instructionScreen();    
}

// Initiate Event Listeners for Instructions Screen
function addInstructionEvents(){
    
}

// Terminate Event Listeners for Instructions Screen
function removeInstructionEvents(){

}