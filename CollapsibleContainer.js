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

function CollapsibleContainer(base, parentWidget){
	this.constructor = CollapsibleContainer;

	if(base)
		this.init(base, parentWidget);
}

CollapsibleContainer.prototype = new ContentWidget();
Widget.autoWidget["collapsibleContainer"] = CollapsibleContainer;

CollapsibleContainer.prototype.templateName = "#collapsible-container-template";

CollapsibleContainer.prototype.init = function init(base, parentWidget){
	this.newProperty("buttonLabel", "Content");
	this.newProperty("collapsed", true);

	this.buttonDisplayLabel = ko.computed(function (){
			if(this.collapsed())
				return this.buttonLabel() + " ►";
			else
				return this.buttonLabel() + " ▼";
		}.bind(this));

	ContentWidget.prototype.init.call(this, base, parentWidget);

	this.rollup(this.contentContainer);
}

CollapsibleContainer.prototype.setContent = function setContent(content){
	this.container.append(content.element);
	if(this.collapsed())
		this.rollup(this.container);
}

CollapsibleContainer.prototype.onClick = function (){
	this.collapsed(!this.collapsed());
	this.rollup(this.contentContainer);
}
