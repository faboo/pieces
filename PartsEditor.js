function PartsEditor(base, parentWidget){
	this.changed = null;
	if(base)
		this.init(base, parentWidget);
}

PartsEditor.prototype = new CollapsibleContainer();
Widget.autoWidget['partsEditor'] = PartsEditor;

PartsEditor.prototype.contentTemplateName = "#parts-editor-template";

PartsEditor.prototype.init = function init(base, parentWidget){
	this.newArrayProperty("parts");

	CollapsibleContainer.prototype.init.call(this, base, parentWidget);

	this.buttonLabel("Parts");
}
