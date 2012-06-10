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

function Shape(template){
	this.constructor = Shape;

	this.newProperty("type", "Polyhedron");
	this.newProperty("name", "Polyhedron");
	this.newProperty("stroke", new Stroke());
	this.newProperty("texture");
	this.newArrayProperty("parts");

	this.subscribeOwn(this.onTypeChanged.bind(this));

	if(template){
		this.load(template);
	}
	else{
		this.texture(new Texture({pattern: "#FFFFFF"}));
	}
}

Shape.prototype = new ImageObject();

Shape.prototype.maskTexture = new Texture({pattern: "rgba(200, 0, 0, 0.5)"});

Shape.prototype.init = function init(template){
}

Shape.prototype.load = function load(template){
	var style = null;
	var part = null;

	this.type(template.type);
	this.texture(new Texture(template.texture));

	for(part in template.parts)
		this.parts.push(new Point(this.parts, template.parts[part]));

	this.name(template.name);

	this.stroke().style(template.stroke.style);
	this.stroke().width(template.stroke.width);
	this.stroke().cap(template.stroke.cap);
	this.stroke().join(template.stroke.join);
}

/**
 * This is for polyhedrons. We'll need a derived EllipsePart for circles.
 */
Shape.prototype.trace = function trace(context){
	var idx = 0;
	var point = null;

	if(this.parts().length > 0){
		point = this.parts()[0];
		context.beginPath();
		context.moveTo(point.x(), point.y());

		for(idx = 1; idx < this.parts().length; ++idx){
			point = this.parts()[idx];
			context.lineTo(point.x(), point.y());
		}

		context.closePath();
		return true;
	}
	else{
		return false;
	}
}

Shape.prototype.draw = function draw(context, canvas, selected){
	if(this.trace(context)){
		context.fillStyle = this.texture().pattern();
		context.fill();

		context.strokeStyle = this.stroke().style();
		context.strokeWidth = this.stroke().width();
		context.strokeCap = this.stroke().cap();
		context.strokeJoin = this.stroke().join();
		context.stroke();

		if(selected)
			this.mask(context);
	}
}

Shape.prototype.drawPoints = function drawPoints(context){
	var point = null;

	for(point in this.parts()){
		point = this.parts()[point];
		context.fillStyle = point.showTexture.pattern();
		context.fillRect(point.x()-2, point.y()-2, 4, 4);
	}
}

Shape.prototype.mask = function mask(context){
	var idx = 0;
	var point = null;

	this.trace(context);

	context.fillStyle = this.maskTexture.pattern();
	context.fill();
}

Shape.prototype.pointInside = function pointInside(context, x, y){
	var inside = false;

	if(this.trace(context)){
		inside = context.isPointInPath(x, y);
	}
	else{
		inside = false;
	}

	return inside? this : null;
}

Shape.prototype.pointNearVertex = function pointNearVertex(x, y){
	var vert = null;

	for(vert in this.parts()){
		vert = this.parts()[vert];
		if(x > vert.x() - 3 && x < vert.x() + 3 &&
			y > vert.y() - 3 && y < vert.y() + 3)
			return vert;
	}

	return null;
}

Shape.prototype.newPart = function newPart(template){
	return new Point(this.parts);
}

Shape.prototype.onTypeChanged = function onTypeChanged(sender, name, newValue){
	if(name === "type"){
		if(newValue === "Ellipsoid"){
			this.trace = EllipsoidRenderer.trace;
			this.drawPoints = EllipsoidRenderer.drawPoints;
		}
		else{
			this.trace = Shape.prototype.trace;
			this.drawPoints = Shape.prototype.drawPoints;
		}
	}
}

Shape.prototype.serialize = function serialize(){
	return "{"+
		"'type' : "+toScript(this.type())+","+
		"'name' : "+toScript(this.name())+","+
		"'texture' : "+this.texture().serialize()+","+
		"'stroke' : "+this.serializeStroke()+","+
		"'parts' : "+this.serializeShape()+
	"}";
}

Shape.prototype.serializeStroke = function serializeStroke(){
	return "{"+
		"'style' : "+toScript(this.stroke().style())+","+
		"'width' : "+this.stroke().width()+","+
		"'cap' : "+toScript(this.stroke().cap())+","+
		"'join' : "+toScript(this.stroke().join())+
	"}";
}

Shape.prototype.serializeShape = function serializeShape(){
	var point = null;
	var points = "[";

	for(point in this.parts()){
		point = this.parts()[point];
		points += "{"+
			"'x' : "+point.x()+","+
			"'y' : "+point.y()+
		"},";
	}

	return points.replace(/,$/, "]");
}
