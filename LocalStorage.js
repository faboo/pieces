//Pieces, Copyright (C) 2012 Ray Wallace
//
//This program is free software; you can redistribute it and/or modify it under
//the terms of the GNU General Public License as published by the Free Software
//Foundation version 2 of the Licens.
//
//This program is distributed in the hope that it will be useful, but WITHOUT
//ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
//FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
//details.
//
//You should have received a copy of the GNU General Public License along with
//this program; if not, write to the Free Software Foundation, Inc., 51 Franklin
//Street, Fifth Floor, Boston, MA  02110-1301, USA.

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
