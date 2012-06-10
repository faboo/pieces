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

function PointsEditor(base, container){
	this.changed = null;
	this.templateName = "#points-editor-template";
	this.newProperty("points", ko.observableArray());
	if(base)
		this.init(base, container);
}

PointsEditor.prototype = new Widget();
Widget.autoWidget["pointsEditor"] = "pointsEditor";

jQuery.fn.pointsEditor = function(points) {
	var editors = [];

	this.each(function() {
			var collapsible = new CollapsibleContainer(this);
			var editor = new PointsEditor(collapsible.container);
			collapsible.buttonLabel("Points");
			if(points)
				editor.points(points);
			editors.push(editor);
		});

	return editors.length == 1? editors[0]: editors;
};
