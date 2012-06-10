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

function Point(container, x, y){
	this.newProperty("x", 0);
	this.newProperty("y", 0);
	this.newProperty("selected", null);
	this.container = container;

	if(x !== undefined){
		if(x instanceof Object){
			this.x = ko.observable(x.x);
			this.y = ko.observable(x.y);
		}
		else{
			this.x = ko.observable(x);
			this.y = ko.observable(y);
		}
	}
}

Point.prototype = new ImageObject();

Point.prototype.maskTexture = new Texture({pattern: "rgba(200, 0, 0, 0.5)"});
Point.prototype.showTexture = new Texture({pattern: "rgb(0, 0, 0)"});
Point.prototype.showControlTexture = new Texture({pattern: "rgb(0, 255, 0)"});

Point.prototype.remove = function remove(){
	this.container.remove(this);
}
