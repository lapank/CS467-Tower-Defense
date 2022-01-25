class Goblin extends Enemy{
	constructor(verticalPosition){
		super(verticalPosition, 0.4, 100);
	}

	draw(){
		super.draw('green', 'brown');
	}
}
