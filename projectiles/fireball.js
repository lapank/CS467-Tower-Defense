class FireBall extends Projectile{
	constructor(x,y){
		super(x,y, 50);
	}
	draw(){
		super.draw('darkorange');
	}
}