function Dialog(base, parentWidget){
	this.constructor = Dialog;
	this.templateName = "#dialog-template";
	
	if(base)
		this.init(base, parentWidget);
}

Dialog.prototype = new ContentWidget();
Widget.autoWidget['dialog'] = Dialog;

Dialog.zIndexIncrement = 100;

Dialog.prototype.moving = false;
Dialog.prototype.mouseDownPos = null;

Dialog.prototype.init = function init(base, parentWidget){
	var titleBar = null;

	this.newProperty("title");
	this.newProperty("modal", false);
	this.newArrayProperty("buttons");

	ContentWidget.prototype.init.call(this, base, parentWidget);

	this.zIndex(this.parentWidget().zIndex() + Dialog.zIndexIncrement);

	titleBar = this.element.find(".dialogTitle");
	titleBar.mousedown(this.onMousedown.bind(this));
	$(document).mouseup(this.onMouseup.bind(this));
	$(document).mousemove(this.onMousemove.bind(this));
}

Dialog.prototype.onMousedown = function onMousedown(event){
	if(!this.modal()){
		this.fillInMouseEvent(event);

		this.moving = true;
		this.mouseDownPos = [event.screenX, event.screenY];
	}

	return false;
}

Dialog.prototype.onMouseup = function onMouseup(event){
	this.fillInMouseEvent(event);
	this.moving = false;
	this.mouseDownPos = null;
}

Dialog.prototype.onMousemove = function onMousemove(event){
	var offset = null;

	this.fillInMouseEvent(event);

	if(this.moving){
		offset = this.element.offset();
		offset.left += event.screenX - this.mouseDownPos[0];
		offset.top += event.screenY - this.mouseDownPos[1];
		this.mouseDownPos = [event.screenX, event.screenY];

		this.element.offset(offset);
	}
}
