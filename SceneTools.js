function SceneTools(base, parentWidget){
	this.constructor = SceneTools;
	this.contentTemplateName = "#scene-tools-template";
	
	if(base)
		this.init(base, parentWidget);
}

SceneTools.prototype = new Dialog();
Widget.autoWidget['sceneTools'] = SceneTools;

SceneTools.prototype.init = function init(base, parentWidget){
	Dialog.prototype.init.call(this, base, parentWidget);

	this.title("Scene");
	this.addButton = new DialogButton("Add", this.onAdd.bind(this));

	this.buttons.push(new DialogButton("Edit", this.onEdit.bind(this), this.disableEdit.bind(this)));
	this.buttons.push(this.addButton);
}

SceneTools.prototype.onEdit = function onEdit(){
	this.parentWidget().onEdit();
}

SceneTools.prototype.disableEdit = function disableEdit(){
	return this.parentWidget().selected() === null;
}

SceneTools.prototype.onAdd = function onAdd(){
	this.parentWidget().onAdd();
}
