class Dragon extends Tower{
	constructor(x,y){
		super(x,y, 150, 0, 200);
	}
	draw(){
		super.draw('lime', 'black');
	}
	update(){
		super.update(FireBall);
	}
}