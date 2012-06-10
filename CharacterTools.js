function CharacterTools(base, parentWidget){
	this.constructor = CharacterTools;
	this.contentTemplateName = "#character-tools-template";

	if(base)
		this.init(base, parentWidget);
}

CharacterTools.prototype = new SceneTools();
Widget.autoWidget['characterTools'] = CharacterTools;

CharacterTools.prototype.init = function init(base, parentWidget){
	SceneTools.prototype.init.call(this, base, parentWidget);

	this.title("Character");

	this.addButton.name("Add Poly");
	this.buttons.push(new DialogButton("Add Ellipse", this.onAddEllipse.bind(this)));
}

CharacterTools.prototype.onAddEllipse = function onAddEllipse(){
	this.parentWidget().onAddEllipsoid();
}
