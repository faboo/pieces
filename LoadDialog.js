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

function LoadDialog(type){
	this.type = type;
	this.constructor = LoadDialog;
	this.contentTemplateName = "#load-dialog-template";
}

LoadDialog.prototype = new Dialog();
Widget.autoWidget['loadDialog'] = LoadDialog;

LoadDialog.prototype.init = function init(base, parentWidget){
	var available = LocalStorage.list(this.type);
	var name = null;

	this.newProperty("name");
	this.newArrayProperty("available");

	Dialog.prototype.init.call(this, base, parentWidget);

	this.modal(true);
	this.title(this.type? "Load "+this.type : "Load a Thing");

	for(name in available)
		this.available.push(available[name]);

	this.buttons.push(new DialogButton("Load", this.onLoad.bind(this), this.disableLoad.bind(this)));
	this.buttons.push(new DialogButton("Cancel", this.close.bind(this)));
}

LoadDialog.prototype.onLoad = function onLoad(){
	var data = LocalStorage.read(this.type+"/"+this.name());

	if(this.load)
		this.load(data);
	this.close();
}

LoadDialog.prototype.disableLoad = function disableLoad(){
	return this.name() === null;
}

LoadDialog.open = function open(type, load){
	var dialog = new LoadDialog(type);
	var base = $("<div></div>", { class: "loadDialog" } );
	
	$("body").append(base);
	$();
	dialog.load = load;
	dialog.init(base, Application.current);
}

