function DialogButton(name, onClick, disabled){
	this.constructor = DialogButton;
	this.init();
	if(name)
		this.name(name);
	if(onClick)
		this.onClick = onClick;
	if(disabled)
		this.checkDisabled(disabled);
}

DialogButton.prototype = new Widget();
Widget.autoWidget["dialogButton"] = DialogButton;

DialogButton.prototype.templateName = "#dialog-button-template";

DialogButton.prototype.init = function init(){
//	Widget.prototype.init.call(this);
	this.newProperty("name");
	this.onClick = function () {};
	this.newProperty("checkDisabled", function () { return false });
	this.isDisabled = ko.computed(function (){
			return this.checkDisabled()();
		}.bind(this));
}


