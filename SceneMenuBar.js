function SceneMenuBar(base, parentWidget){
	this.constructor = SceneMenuBar;
	if(base)
		this.init(base, parentWidget);
}

SceneMenuBar.prototype = new MenuBar();

Widget.autoWidget["sceneMenuBar"] = SceneMenuBar;

SceneMenuBar.prototype.init = function init(base, parentWidget){
	MenuBar.prototype.init.call(this, base, parentWidget);

	this.menus.push(
			new MenuItem("Save", this.onSave.bind(this)));
	this.menus.push(
			new MenuItem("Load", this.onLoad.bind(this)));
	this.menus.push(
			new MenuItem("New", this.onNew.bind(this)));
}

SceneMenuBar.prototype.onSave = function onSave(){
	SaveDialog.open(this.editor.scene());
	/*var data = this.editor.scene().serialize();

	LocalStorage.write(
		"scene/"+this.editor.scene().name(),
		data);*/
}

SceneMenuBar.prototype.onLoad = function onLoad(){
	LoadDialog.open(this.editor.scene().type, this.load.bind(this));
}

SceneMenuBar.prototype.onNew = function onNew(){
	this.editor.load(new Scene());
}

SceneMenuBar.prototype.load = function load(data){
	this.editor.scene().load(eval('('+data+')'));
	this.editor.draw();
}
