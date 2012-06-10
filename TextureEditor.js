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

function TextureEditor(base, parentWidget){
	this.constructor = TextureEditor;

	this.changed = null;
	if(base)
		this.init(base, parentWidget);
}

TextureEditor.prototype = new CollapsibleContainer();
Widget.autoWidget['textureEditor'] = TextureEditor;

TextureEditor.prototype.contentTemplateName = "#texture-editor-template";

TextureEditor.prototype.changed = null;

TextureEditor.prototype.init = function init(base, parentWidget){
	this.newProperty("texture", new Texture());

	CollapsibleContainer.prototype.init.call(this, base, parentWidget);

	this.buttonLabel("Texture");
}
