// Instructions Screen game loop
function instructionScreen(){
	// Draw the Title Screen
	context.fillStyle = 'blue';
	context.fillRect(0,0, canvas.width, canvas.height);
	// Title Display
	context.fillStyle = 'gold';
	context.font = levelSelect.fontSize +'px Arial';
	context.fillText('How to Play', 210, 75);
	drawButton(backButton);
	// Instruction Text
	

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
    addInstructionEvents()
    instructionScreen();    
}

// Initiate Event Listeners for Instructions Screen
function addInstructionEvents(){
    canvas.addEventListener('click', back_press);
}

// Terminate Event Listeners for Instructions Screen
function removeInstructionEvents(){
    canvas.removeEventListener('click', back_press);
}