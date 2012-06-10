function MenuItem(name, onClick, position){
	this.constructor = MenuItem;
	this.init();
	if(name)
		this.name = name;
	if(onClick)
		this.onClick(onClick);
	if(position)
		this.position(position);
}

MenuItem.prototype = new Widget();

MenuItem.prototype.init = function init(){
	this.newProperty("name");
	this.newProperty("onClick", function () {});
	this.newProperty("position", "left");
}
