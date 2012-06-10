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
