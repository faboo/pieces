function SceneEditor(base, parentWidget){
	this.templateName = "#scene-editor-template";
	if(base)
		this.init(base, parentWidget);
}

SceneEditor.prototype = new Editor();
Widget.autoWidget['sceneEditor'] = SceneEditor;
