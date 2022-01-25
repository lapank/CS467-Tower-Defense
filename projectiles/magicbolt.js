class MagicBolt extends Projectile{
	constructor(x,y){
		super(x,y,10);
	}
	draw(){
		super.draw('gold');
	}
}