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

function MenuBar(base, parentWidget){
	this.constructor = MenuBar;
	if(base)
		this.init(base, parentWidget);
}

MenuBar.prototype = new Widget();

MenuBar.prototype.init = function init(base, parentWidget){
	this.templateName = "#menu-bar-template";
	this.newArrayProperty("menus");

	Widget.prototype.init.call(this, base, parentWidget);
}

Widget.autoWidget.menuBar = "menuBar";

jQuery.fn.menuBar = function() {
	var widgets = [];

	this.each(function() {
			var menu = new MenuBar(this);
			widgets.push(widgets);
		});

	return widgets.length == 1? widgets[0]: widgets;
};
