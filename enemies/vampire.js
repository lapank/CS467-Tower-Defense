//Vampire Enemy
class Vampire extends Enemy{
	constructor(verticalPosition){
		super(verticalPosition, 1.2, 60);
	}

	update(){
		super.update();
		if (this.health < this.maxHealth){     //vampire's regain health over time
			this.health += 0.1;
		}
	}

	draw(){
		super.draw('red', 'grey');
	}
}