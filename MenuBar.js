function MenuBar(base, parentWidget){
	this.constructor = MenuBar;
	if(base)
		this.init(base, parentWidget);
}

MenuBar.prototype = new Widget();

MenuBar.prototype.init = function init(base, parentWidget){
	this.templateName = "#menu-bar-template";
	this.newArrayProperty("menus");

	Widget.prototype.init.call(this, base, parentWidget);
}

Widget.autoWidget.menuBar = "menuBar";

jQuery.fn.menuBar = function() {
	var widgets = [];

	this.each(function() {
			var menu = new MenuBar(this);
			widgets.push(widgets);
		});

	return widgets.length == 1? widgets[0]: widgets;
};
