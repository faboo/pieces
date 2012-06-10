function PartMenuBar(base, parentWidget){
	this.constructor = PartMenuBar;
	if(base)
		this.init(base, parentWidget);
}

PartMenuBar.prototype = new MenuBar();

Widget.autoWidget["partMenuBar"] = PartMenuBar;

PartMenuBar.prototype.init = function init(base, parentWidget){
	MenuBar.prototype.init.call(this, base, parentWidget);

	this.menus.push(
			new MenuItem("Save", this.onSave.bind(this)));
	this.menus.push(
			new MenuItem("Load", this.onLoad.bind(this)));

	this.menus.push(
			new MenuItem("x", this.onClose.bind(this), "right"));
}

PartMenuBar.prototype.onSave = function onSave(){
	SaveDialog.open(this.editor.scene());
}

PartMenuBar.prototype.onLoad = function onLoad(){
	LoadDialog.open(this.editor.scene().type, this.load.bind(this));
}

PartMenuBar.prototype.onClose = function onClose(){
	this.editor.close();
}

PartMenuBar.prototype.load = function load(data){
	this.editor.scene().load(eval('('+data+')'));
	this.editor.draw();
}
