var LocalStorage = {
	base : 'image-edit/',
	indices : 'index/',

	exists : function exists(path){
		return window.localStorage.getItem(this.base+path) === null;
	},

	list : function list(dir){
		var index = window.localStorage.getItem(this.indices+dir);
		if(index === null)
			return [];
		else
			return eval('('+index+')');
	},

	dirPart : function dirPart(path){
		return path.replace(/\/?[^\/]+$/, '');
	},

	namePart : function namePart(path){
		return path.replace(/^.*\//, '');
	},

	read : function read(path){
		return window.localStorage.getItem(this.base+path);
	},

	write : function write(path, value){
		var name = this.namePart(path);
		var dir = this.dirPart(path);
		var index = this.list(dir);

		if(index.indexOf(name) < 0)
			index.push(name);

		window.localStorage.setItem(this.base+path, new String(value));
		window.localStorage.setItem(this.indices+dir, toScript(index));
	}
}
