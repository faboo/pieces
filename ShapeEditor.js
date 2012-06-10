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

function ShapeEditor(base){
	this.constructor = ShapeEditor;
	this.templateName = "#shape-editor-template";
	this.init(base);
}

ShapeEditor.prototype = new CharacterEditor();

ShapeEditor.prototype.load = function load(template){
	var point = null;
	var editor = null;

	CharacterEditor.prototype.load.call(this, template);
}

ShapeEditor.prototype.draw = function draw(){
	CharacterEditor.prototype.draw.call(this);

	this.context.save();
	this.moveToCenter();
	this.scene().drawPoints(this.context);
	this.context.restore();

	// hilight the selected vertex
	this.context.save();
	this.moveToCenter();
	if(this.selected()){
		this.context.strokeStyle = this.selected().maskTexture.pattern();
		this.context.fillStyle = this.selected().maskTexture.pattern();
		this.context.strokeWidth = 5;
		this.context.strokeRect(this.selected().x()-3, this.selected().y()-3, 6, 6);
		this.context.fillRect(this.selected().x()-3, this.selected().y()-3, 6, 6);
	}
	this.context.restore();
}

ShapeEditor.prototype.onAdd = function onAdd(){
	var point = this.scene().newPart();

	this.scene().parts.push(point);
	this.select(point);
	this.draw();
}

ShapeEditor.prototype.onMousedown = function onMousedown(event){
	var near = this.scene().pointNearVertex(
		event.offsetX - this.canvas.width/2,
		event.offsetY - this.canvas.height/2);
	var th = this;

	this.mouseDownPos = [event.offsetX, event.offsetY];

	this.select(near);

	this.draw();

	return false;
}

ShapeEditor.prototype.onMousemove = function onMousemove(event){
	if(this.mouseDownPos && this.selected()){
		this.selected().x(event.offsetX - this.canvas.width/2);
		this.selected().y(event.offsetY - this.canvas.height/2);
		this.draw();
	}
}
