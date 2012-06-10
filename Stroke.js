function Stroke(){
	this.newProperty("style", "#000000");
	this.newProperty("width", 1);
	this.newProperty("cap", "round");
	this.newProperty("join", "round");
}

Stroke.prototype = new ImageObject();
