//Pieces, Copyright (C) 2012 Ray Wallace
//
//This program is free software; you can redistribute it and/or modify it under
//the terms of the GNU General Public License as published by the Free Software
//Foundation version 2 of the Licens.
//
//This program is distributed in the hope that it will be useful, but WITHOUT
//ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
//FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
//details.
//
//You should have received a copy of the GNU General Public License along with
//this program; if not, write to the Free Software Foundation, Inc., 51 Franklin
//Street, Fifth Floor, Boston, MA  02110-1301, USA.

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
