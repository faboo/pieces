function MultiFunction(){
	this.functions = [];
}

MultiFunction.prototype.add = function add(func, th){
	this.functions.push(func);
}

MultiFunction.prototype.remove = function remove(func){
	var idx = this.functions.indexOf(func);
	this.functions.splice(idx, 1);
}

MultiFunction.prototype.call = function call(){
	var args = $.makeArray(arguments);
	var func = null;

	for(func in this.functions)
		this.functions[func].apply(window, args);
}
