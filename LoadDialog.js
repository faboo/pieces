function LoadDialog(type){
	this.type = type;
	this.constructor = LoadDialog;
	this.contentTemplateName = "#load-dialog-template";
}

LoadDialog.prototype = new Dialog();
Widget.autoWidget['loadDialog'] = LoadDialog;

LoadDialog.prototype.init = function init(base, parentWidget){
	var available = LocalStorage.list(this.type);
	var name = null;

	this.newProperty("name");
	this.newArrayProperty("available");

	Dialog.prototype.init.call(this, base, parentWidget);

	this.modal(true);
	this.title(this.type? "Load "+this.type : "Load a Thing");

	for(name in available)
		this.available.push(available[name]);

	this.buttons.push(new DialogButton("Load", this.onLoad.bind(this), this.disableLoad.bind(this)));
	this.buttons.push(new DialogButton("Cancel", this.close.bind(this)));
}

LoadDialog.prototype.onLoad = function onLoad(){
	var data = LocalStorage.read(this.type+"/"+this.name());

	if(this.load)
		this.load(data);
	this.close();
}

LoadDialog.prototype.disableLoad = function disableLoad(){
	return this.name() === null;
}

LoadDialog.open = function open(type, load){
	var dialog = new LoadDialog(type);
	var base = $("<div></div>", { class: "loadDialog" } );
	
	$("body").append(base);
	$();
	dialog.load = load;
	dialog.init(base, Application.current);
}

