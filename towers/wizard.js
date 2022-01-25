class Wizard extends Tower{
	constructor(x,y){
		super(x,y, 75, 0, 40);
	}
	draw(){
		super.draw('skyblue', 'gold');
	}
	update(){
		super.update(MagicBolt);
	}
}