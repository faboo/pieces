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
