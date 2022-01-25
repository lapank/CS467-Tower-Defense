class Archer extends Tower{
	constructor(x,y){
		super(x,y, 100, 0, 100);
	}
	draw(){
		super.draw('saddlebrown', 'white');
	}
	update(){
		super.update(Arrow);
	}
}