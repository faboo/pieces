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

function CharacterTools(base, parentWidget){
	this.constructor = CharacterTools;
	this.contentTemplateName = "#character-tools-template";

	if(base)
		this.init(base, parentWidget);
}

CharacterTools.prototype = new SceneTools();
Widget.autoWidget['characterTools'] = CharacterTools;

CharacterTools.prototype.init = function init(base, parentWidget){
	SceneTools.prototype.init.call(this, base, parentWidget);

	this.title("Character");

	this.addButton.name("Add Poly");
	this.buttons.push(new DialogButton("Add Ellipse", this.onAddEllipse.bind(this)));
}

CharacterTools.prototype.onAddEllipse = function onAddEllipse(){
	this.parentWidget().onAddEllipsoid();
}
