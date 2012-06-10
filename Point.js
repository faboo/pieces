function Point(container, x, y){
	this.newProperty("x", 0);
	this.newProperty("y", 0);
	this.newProperty("selected", null);
	this.container = container;

	if(x !== undefined){
		if(x instanceof Object){
			this.x = ko.observable(x.x);
			this.y = ko.observable(x.y);
		}
		else{
			this.x = ko.observable(x);
			this.y = ko.observable(y);
		}
	}
}

Point.prototype = new ImageObject();

Point.prototype.maskTexture = new Texture({pattern: "rgba(200, 0, 0, 0.5)"});
Point.prototype.showTexture = new Texture({pattern: "rgb(0, 0, 0)"});
Point.prototype.showControlTexture = new Texture({pattern: "rgb(0, 255, 0)"});

Point.prototype.remove = function remove(){
	this.container.remove(this);
}
