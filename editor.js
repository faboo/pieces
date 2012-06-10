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

function Editor(base){
	this.constructor = Editor;
}

Editor.prototype = new Widget();

Editor.zorder = 0;
Editor.zIndexIncrement = 1000;

Editor.prototype.init = function init(base, parentWidget){
	this.newProperty("parentWidget", parentWidget);
	this.newProperty("selected", null);
	this.newProperty("scene", null);
	this.mouseDownPos = null;
	this.center = null;
	this.controlPanel = null;
	this.canvasContainer = null;

	this.create($(base));

	if(this.parentWidget())
		this.zIndex(this.parentWidget().zIndex() + Editor.zIndexIncrement);

	$(this.canvas).mousedown(this.onMousedown.bind(this));
	$(this.canvas).mouseup(this.onMouseup.bind(this));
	$(this.canvas).mousemove(this.onMousemove.bind(this));
	this.takeFocus();

	this.subscribe(function (t, n, v){
		this.draw()
		}.bind(this));
}

Editor.prototype.create = function create(base){
	this.editor = this.applyTemplate(base);

	this.canvas = this.editor.find(".display")[0];
	this.context = this.canvas.getContext('2d');
	this.controlPanel = this.editor.find(".controlPanel");

	this.canvasContainer = this.editor.find(".canvas-container");
}

Editor.prototype.fitSize = function fitSize(){
	var canvasContainer = this.canvasContainer[0];
	var height = this.element.parent().innerHeight();

	height -= canvasContainer.offsetTop + canvasContainer.clientTop + 4;
	this.canvasContainer.height(height);

	this.canvas.width = this.canvasContainer.innerWidth();
	this.canvas.height = this.canvasContainer.innerHeight();
}

Editor.prototype.load = function load(template){
	var th = this;

	if(typeof template === "string")
		this.scene(new Scene(eval('('+template+')')));
	else
		this.scene(template);

	$(function (){
		th.controlPanel.dialog({
			title : th.scene().type,
			closeOnEscape : false,
			position : 'right',
			height : 400
		});
	});
	this.controlPanel.parent().find(".ui-dialog-titlebar-close").remove();
	this.fitSize();
	this.draw();

	$(window).resize(this.onResize.bind(this));
}

Editor.prototype.draw = function draw(){
	var part = null;

	this.clearCanvas();

	if(this.scene())
		this.scene().draw(this.context, this.canvas, false);
}

Editor.prototype.clearCanvas = function clearCanvas(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Editor.prototype.clearSelection = function clearSelection(){
	if(this.selected()){
		this.selected().selected(false);
		this.selected(null);
	}
}

Editor.prototype.select = function select(character){
	var th = this;

	this.clearSelection();

	this.selected(character);
	if(this.selected()){
		this.selected().selected(true);
	}
}

Editor.prototype.selectNext = function selectNext(){
	if(this.selected){
		var idx = this.scene().parts().indexOf(this.selected) + 1;

		if(this.scene().parts().length > 0){
			if(idx < this.scene().parts().length)
				this.select(this.scene().parts()[idx]);
			else if(this.scene().parts().length > 0)
				this.select(this.scene().parts()[0]);
		}
		else{
			this.clearSelection();
		}
	}
	else if(this.scene().parts().length > 0){
		this.select(this.scene().parts()[0]);
	}
}

Editor.prototype.selectPrevious = function selectPrevious(){
	if(this.selected){
		var idx = this.scene().parts().indexOf(this.selected) - 1;

		if(this.scene().parts().length > 0){
			if(idx > 0)
				this.select(this.scene().parts()[idx]);
			else 
				this.select(this.scene().parts()[this.scene().parts().length - 1]);
		}
		else{
			this.clearSelection();
		}
	}
	else if(this.scene().parts().length > 0){
		this.select(this.scene().parts()[this.scene().parts().length - 1]);
	}
}

Editor.prototype.partUnderPoint = function partUnderPoint(x, y){
	return this.scene().pointInside(this.context, x, y);
}

Editor.prototype.onEdit = function onEdit(){
	var subEditor = $("<div></div>",
		{
			class : "editor",
			style : "z-index: "+(Editor.zorder + Editor.zIndexIncrement)
			});
	var editor = null;
	var th = this;

	this.releaseFocus();

	this.hideControlPanel();

	$("body").append(subEditor);
	$(); //rehash the DOM

	if(this.selected().character() instanceof Shape)
		editor = new ShapeEditor(subEditor);
	else if(this.selected().character() instanceof Character)
		editor = new CharacterEditor(subEditor);

	editor.onClose = function() {
			th.draw();
			th.takeFocus();
			editor.controlPanel.remove();
			this.clearSelection();
			Editor.zorder -= Editor.zIndexIncrement;
			th.showControlPanel();
        };

	editor.load(this.selected().character());
}

Editor.prototype.hideControlPanel = function hideControlPanel(){
	this.controlPanel.parent().hide();

}

Editor.prototype.showControlPanel = function showControlPanel(){
	this.controlPanel.parent().show();
}

Editor.prototype.onAdd = function onAdd(){
	var part = this.scene().newPartContainer();

	this.scene().parts.push(part);
	this.select(part);

	this.onEdit();
}

Editor.prototype.onMousedown = function onMousedown(event){
	this.fillInMouseEvent(event);
	var inside = this.partUnderPoint(event.offsetX, event.offsetY);

	this.mouseDownPos = [event.offsetX, event.offsetY];

	this.select(inside);

	return false;
}

Editor.prototype.onMouseup = function onMouseup(event){
	this.fillInMouseEvent(event);
	this.mouseDownPos = null;
}

Editor.prototype.onMousemove = function onMousemove(event){
	var offset = null;

	this.fillInMouseEvent(event);

	if(this.mouseDownPos && this.selected()){
		offset = {
				left: this.selected().transform().x(),
				top: this.selected().transform().y(),
			};
		offset.left += event.offsetX - this.mouseDownPos[0];
		offset.top += event.offsetY - this.mouseDownPos[1];
		this.mouseDownPos = [event.offsetX, event.offsetY];
		
		this.selected().transform().x(offset.left);
		this.selected().transform().y(offset.top);
	}
}

Editor.prototype.onKeydown = function onKeydown(event){
	if(event.keyCode === 39){
		this.selectNext();
		return false;
	}
	if(event.keyCode === 37){
		this.selectPrevious();
		return false;
	}
}

Editor.prototype.onResize = function onResize(event){
	this.fitSize();
	this.draw();
}
