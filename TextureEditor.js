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
