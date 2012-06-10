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

function MultipartContainer(container, template){
	this.constructor = MultipartContainer;

	this.newProperty("character", null);
	this.newProperty("transform", new Transform());
	this.newProperty("selected", false);

	this.container = container;

	if(typeof template === "object"){
		this.transform(new Transform(template.transform));
	}
}

MultipartContainer.prototype = new ImageObject();

MultipartContainer.prototype.remove = function remove(){
	this.container.remove(this);
}

MultipartContainer.prototype.moveUp = function moveUp(){
	var idx = this.container.indexOf(this);
	var removed = [];

	if(idx > 0){
		while(idx > 0){
			removed.unshift(this.container.shift());
			idx -= 1;
		}
		this.container.shift();
		for(idx in removed){
			this.container.unshift(removed[idx]);
			if(idx === 0)
				this.container.unshift(this);
		}
	}
}

MultipartContainer.prototype.moveDown = function moveDown(){
	var idx = this.container.indexOf(this);
	var removed = [];

	if(idx < this.container().length - 1){
		while(idx < this.container().length - 1){
			removed.unshift(this.container.pop());
		}
		this.container.pop();
		for(idx in removed){
			this.container.push(removed[idx]);
			if(idx === 0)
				this.container.push(this);
		}
	}
}
