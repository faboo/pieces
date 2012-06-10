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

function SceneTools(base, parentWidget){
	this.constructor = SceneTools;
	this.contentTemplateName = "#scene-tools-template";
	
	if(base)
		this.init(base, parentWidget);
}

SceneTools.prototype = new Dialog();
Widget.autoWidget['sceneTools'] = SceneTools;

SceneTools.prototype.init = function init(base, parentWidget){
	Dialog.prototype.init.call(this, base, parentWidget);

	this.title("Scene");
	this.addButton = new DialogButton("Add", this.onAdd.bind(this));

	this.buttons.push(new DialogButton("Edit", this.onEdit.bind(this), this.disableEdit.bind(this)));
	this.buttons.push(this.addButton);
}

SceneTools.prototype.onEdit = function onEdit(){
	this.parentWidget().onEdit();
}

SceneTools.prototype.disableEdit = function disableEdit(){
	return this.parentWidget().selected() === null;
}

SceneTools.prototype.onAdd = function onAdd(){
	this.parentWidget().onAdd();
}
