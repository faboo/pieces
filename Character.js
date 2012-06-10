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
