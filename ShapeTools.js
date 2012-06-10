function ShapeTools(base, parentWidget){
	this.constructor = ShapeTools;
	this.contentTemplateName = "#shape-tools-template";
	
	if(base)
		this.init(base, parentWidget);
}

ShapeTools.prototype = new SceneTools();
Widget.autoWidget['shapeTools'] = ShapeTools;

ShapeTools.prototype.init = function init(base, parentWidget){
	Dialog.prototype.init.call(this, base, parentWidget);

	this.title("Shape");
	this.buttons.removeAll();
	this.addButton = new DialogButton("Add", this.onAdd.bind(this));
	this.buttons.push(this.addButton);
}
