class Troll extends Enemy{
	constructor(verticalPosition){
		super(verticalPosition, 0.2, 400);
	}
	draw(){
		super.draw('purple','blue');
	}

}