function Scene(template){
	this.constructor = Scene;

	this.type = "Scene";
	this.newProperty("name", "Scene");
	this.newArrayProperty("parts");
	this.newProperty("background");

	if(template){
		this.load(template);
	}
	else{
		this.background(new Texture({pattern: "#FFFFFF"}));
	}
}

Scene.prototype = new Multipart();

Scene.prototype.load = function load(template){
	Multipart.prototype.load.call(this, template);

	this.background(new Texture(template.background));

	this.name(template.name);
}

Scene.prototype.draw = function draw(context, canvas){
	context.fillStyle = this.background().pattern();
	context.fillRect(0, 0, canvas.width, canvas.height);
	Multipart.prototype.draw.call(this, context, canvas, false);
}

Scene.prototype.newPart = function newPart(){
	return new Character();
}

Scene.prototype.serialize = function serialize(){
	return "{"+
		"'type' : "+toScript(this.type)+","+
		"'name' : "+toScript(this.name())+","+
		"'parts' : "+this.serializeParts()+","+
		"'background' : "+this.background().serialize()+
	"}";
}
