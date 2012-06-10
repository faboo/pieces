function Transform(x, y, r){
	this.constructor = Transform;

	this.newProperty("x", 0);
	this.newProperty("y", 0);
	this.newProperty("r", 0);

	if(x !== undefined){
		if(x instanceof Object){
			this.x(x.x);
			this.y(x.y);
			this.r(x.r);
		}
		else{
			this.x(x);
			this.y(y);
			this.r(r);
		}
	}
}

Transform.prototype = new ImageObject();
