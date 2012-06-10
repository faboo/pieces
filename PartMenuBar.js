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

function PartMenuBar(base, parentWidget){
	this.constructor = PartMenuBar;
	if(base)
		this.init(base, parentWidget);
}

PartMenuBar.prototype = new MenuBar();

Widget.autoWidget["partMenuBar"] = PartMenuBar;

PartMenuBar.prototype.init = function init(base, parentWidget){
	MenuBar.prototype.init.call(this, base, parentWidget);

	this.menus.push(
			new MenuItem("Save", this.onSave.bind(this)));
	this.menus.push(
			new MenuItem("Load", this.onLoad.bind(this)));

	this.menus.push(
			new MenuItem("x", this.onClose.bind(this), "right"));
}

PartMenuBar.prototype.onSave = function onSave(){
	SaveDialog.open(this.editor.scene());
}

PartMenuBar.prototype.onLoad = function onLoad(){
	LoadDialog.open(this.editor.scene().type, this.load.bind(this));
}

PartMenuBar.prototype.onClose = function onClose(){
	this.editor.close();
}

PartMenuBar.prototype.load = function load(data){
	this.editor.scene().load(eval('('+data+')'));
	this.editor.draw();
}
