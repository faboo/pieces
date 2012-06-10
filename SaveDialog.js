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

function SaveDialog(type){
	this.type = type;
	this.constructor = SaveDialog;
	this.contentTemplateName = "#save-dialog-template";
}

SaveDialog.prototype = new Dialog();
Widget.autoWidget['saveDialog'] = SaveDialog;

SaveDialog.prototype.init = function init(base, parentWidget){
	this.newProperty("name");
	this.newProperty("toSave");

	Dialog.prototype.init.call(this, base, parentWidget);

	this.modal(true);
	this.title(this.type? "Save "+this.type : "Save a Thing");

	this.buttons.push(new DialogButton("Save", this.onSave.bind(this)));
	this.buttons.push(new DialogButton("Cancel", this.close.bind(this)));
}

SaveDialog.prototype.onSave = function onSave(){
	var data = this.toSave().serialize();

	LocalStorage.write(this.toSave().type+"/"+this.name(), data);
	this.close();
}

SaveDialog.prototype.onCancel = function onCancel(){
	this.close();
}

SaveDialog.open = function open(toSave){
	var dialog = new SaveDialog(toSave.type);
	var base = $("<div></div>", { class: "saveDialog" } );
	
	$("body").append(base);
	$();
	dialog.init(base, Application.current);
	dialog.toSave(toSave);
	dialog.name(toSave.name());
}
