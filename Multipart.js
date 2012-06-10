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

function Multipart(){
	this.parts = null;
}

Multipart.prototype = new ImageObject();

Multipart.prototype.newPart = null;

Multipart.prototype.load = function load(template){
	var part = null;

	this.parts.removeAll();

	for(part in template.parts)
		this.parts.push(this.newPartContainer(template.parts[part]));
}

Multipart.prototype.newPartContainer = function newPartContainer(template){
	var container = new MultipartContainer(this.parts, template);
	var part = this.newPart(template);

	if(typeName(template) === "Object")
		part.load(template.character);

	container.character(part);

	return container;
}

Multipart.prototype.draw = function draw(context, canvas, selected){
	var part = null;

	for(part in this.parts()){
		part = this.parts()[part];

		context.save();
		context.translate(part.transform().x(), part.transform().y());
		context.rotate(part.transform().r());
		part.character().draw(context, canvas, selected || part.selected());
		context.restore();
	}
}

Multipart.prototype.pointInside = function pointInside(context, x, y){
	var inside = null;
	var part = null;
	var idx = null;

	for(idx = this.parts().length - 1; idx >= 0; --idx){
		part = this.parts()[idx];

		context.save();
		context.translate(part.transform().x(), part.transform().y());
		context.rotate(part.transform().r());
		inside = part.character().pointInside(context, x, y);
		context.restore();

		if(inside)
			return part;
	}

	return null;
}

Multipart.prototype.translatePoint = function translatePoint(x, y, t, c){
	x -= t.x();
	y -= t.y();
	return {
		x : Math.cos(t.r())*(x - c.x()) - Math.sin(t.r())*(y - c.y()) + c.x(),
		y : Math.sin(t.r())*(x - c.x()) + Math.cos(t.r())*(y - c.y()) + c.y()
	};
}

Multipart.prototype.serializeParts = function serializeParts(){
	var part = null;
	var parts = "[";

	for(part in this.parts()){
		part = this.parts()[part];
		parts += "{"+
			"'character' : "+part.character().serialize()+","+
			"'transform' : "+this.serializeTransform(part.transform())+
		"},";
	}

	return parts.replace(/,$/, "]");
}

Multipart.prototype.serializeTransform = function serializeTransform(transform){
	return "{"+
		"'x' : "+transform.x()+","+
		"'y' : "+transform.y()+","+
		"'r' : "+transform.r()+
	"}";
}
