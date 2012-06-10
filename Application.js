function Application(base){
	if(Application.current !== null)
		throw new Error("Only one Application can run at a time");
	this.init(base);
	base.height($(window).innerHeight());
	Application.current = this;
}

Application.current = null;

Application.prototype = new Widget();
Widget.autoWidget['application'] = Application;

Application.prototype.templateName = "#application-template";
/*
Application.prototype.onSave = function onSave(){
	var data = this.editor.scene().serialize();

	window.localStorage.setItem("edit-image", data);
}

Application.prototype.onLoad = function onLoad(){
	var data = window.localStorage.getItem("edit-image");

	this.editor.load(data);
}

Application.prototype.onNew = function onNew(){
	this.editor.load(new Scene());
}*/
