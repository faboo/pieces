function SaveDialog(type){
	this.type = type;
	this.constructor = SaveDialog;
	this.contentTemplateName = "#save-dialog-template";
}

SaveDialog.prototype = new Dialog();
Widget.autoWidget['saveDialog'] = SaveDialog;

SaveDialog.prototype.init = function init(base, parentWidget){
	this.newProperty("name");
	this.newProperty("toSave");

	Dialog.prototype.init.call(this, base, parentWidget);

	this.modal(true);
	this.title(this.type? "Save "+this.type : "Save a Thing");

	this.buttons.push(new DialogButton("Save", this.onSave.bind(this)));
	this.buttons.push(new DialogButton("Cancel", this.close.bind(this)));
}

SaveDialog.prototype.onSave = function onSave(){
	var data = this.toSave().serialize();

	LocalStorage.write(this.toSave().type+"/"+this.name(), data);
	this.close();
}

SaveDialog.prototype.onCancel = function onCancel(){
	this.close();
}

SaveDialog.open = function open(toSave){
	var dialog = new SaveDialog(toSave.type);
	var base = $("<div></div>", { class: "saveDialog" } );
	
	$("body").append(base);
	$();
	dialog.init(base, Application.current);
	dialog.toSave(toSave);
	dialog.name(toSave.name());
}
