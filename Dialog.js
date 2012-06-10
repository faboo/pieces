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

function Dialog(base, parentWidget){
	this.constructor = Dialog;
	this.templateName = "#dialog-template";
	
	if(base)
		this.init(base, parentWidget);
}

Dialog.prototype = new ContentWidget();
Widget.autoWidget['dialog'] = Dialog;

Dialog.zIndexIncrement = 100;

Dialog.prototype.moving = false;
Dialog.prototype.mouseDownPos = null;

Dialog.prototype.init = function init(base, parentWidget){
	var titleBar = null;

	this.newProperty("title");
	this.newProperty("modal", false);
	this.newArrayProperty("buttons");

	ContentWidget.prototype.init.call(this, base, parentWidget);

	this.zIndex(this.parentWidget().zIndex() + Dialog.zIndexIncrement);

	titleBar = this.element.find(".dialogTitle");
	titleBar.mousedown(this.onMousedown.bind(this));
	$(document).mouseup(this.onMouseup.bind(this));
	$(document).mousemove(this.onMousemove.bind(this));
}

Dialog.prototype.onMousedown = function onMousedown(event){
	if(!this.modal()){
		this.fillInMouseEvent(event);

		this.moving = true;
		this.mouseDownPos = [event.screenX, event.screenY];
	}

	return false;
}

Dialog.prototype.onMouseup = function onMouseup(event){
	this.fillInMouseEvent(event);
	this.moving = false;
	this.mouseDownPos = null;
}

Dialog.prototype.onMousemove = function onMousemove(event){
	var offset = null;

	this.fillInMouseEvent(event);

	if(this.moving){
		offset = this.element.offset();
		offset.left += event.screenX - this.mouseDownPos[0];
		offset.top += event.screenY - this.mouseDownPos[1];
		this.mouseDownPos = [event.screenX, event.screenY];

		this.element.offset(offset);
	}
}
