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

function DialogButton(name, onClick, disabled){
	this.constructor = DialogButton;
	this.init();
	if(name)
		this.name(name);
	if(onClick)
		this.onClick = onClick;
	if(disabled)
		this.checkDisabled(disabled);
}

DialogButton.prototype = new Widget();
Widget.autoWidget["dialogButton"] = DialogButton;

DialogButton.prototype.templateName = "#dialog-button-template";

DialogButton.prototype.init = function init(){
//	Widget.prototype.init.call(this);
	this.newProperty("name");
	this.onClick = function () {};
	this.newProperty("checkDisabled", function () { return false });
	this.isDisabled = ko.computed(function (){
			return this.checkDisabled()();
		}.bind(this));
}


