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

function Texture(template){
	this.constructor = Texture;
	var th = this;

	this.newProperty("imageUrl");
	this.newProperty("direction", "repeat");
	this.newProperty("pattern", "#FFFFFF");

	this.imageUrl.subscribe(function(){ th.setImage() });
	this.direction.subscribe(function(){ th.setImage() });

	if(template){
		if(!template.pattern){
			this.imageUrl(template.imageUrl);
			this.direction(template.direction);
			this.setImage();
		}
		else{
			this.pattern(template.pattern);
		}
	}

}

Texture.prototype = new ImageObject();

Texture.drawingCanvas = null;
Texture.drawingContext = function (){
	if(Texture.drawingCanvas === null)
		Texture.drawingCanvas = $('canvas')[0];

	if(Texture.drawingContext.cache === null)
		Texture.drawingContext.cache = Texture.drawingCanvas.getContext('2d');

	return Texture.drawingContext.cache;
}
Texture.drawingContext.cache = null;

Texture.prototype.setImage = function setImage(url, dir){
	var th = this;
	var image = new Image();

	image.crossOrigin = "anonymous";
	image.onload = function(){
		th.pattern(Texture.drawingContext().createPattern(image, th.direction()));
	};
	image.onerror = function(event){
		alert("Failed to load texture image");
	};
	image.src = this.imageUrl();
}

Texture.prototype.serialize = function serialize(){
	return "{"+
	"'imageUrl' : "+toScript(this.imageUrl())+","+
	"'direction' : "+toScript(this.direction())+","+
	"'pattern' : "+
		(typeof this.pattern() === "string"?
		toScript(this.pattern()) :
		"null")+
	"}";
}
