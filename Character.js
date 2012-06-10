function Character(template){
	this.constructor = Character;

	this.type = "Character";
	this.newProperty("name", "Character");
	this.newArrayProperty("parts");

	if(template){
		this.load(template);
	}
}

Character.prototype = new Multipart();

Character.prototype.load = function load(template){
	Multipart.prototype.load.call(this, template);

	if(typeName(template) === "string")
		this.name(template);
	if(template.name)
		this.name(template.name);
}

Character.prototype.newPart = function newPart(template){
	var shape = new Shape();

	shape.type(template);
	shape.name(template);
	return shape;
}

Character.prototype.serialize = function serialize(){
	return "{"+
		"'type' : "+toScript(this.type)+","+
		"'name' : "+toScript(this.name())+","+
		"'parts' : "+this.serializeParts()+
	"}";
}
