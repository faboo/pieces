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

function ImageObject(){
	this.changeHandlers = null;
	this.ownChangeHandlers = null;

	this.onChange = null;

	this.changing = { };
}


ImageObject.OnChange = function OnChange(source, name, newValue){
	//log("update for "+name+" on "+typeName(this)+" from "+typeName(source));
	this.changeHandlers.call(source, name, newValue);
}

ImageObject.prototype.initHandlers = function initHandlers(){
	if(this.onChange === null)
		this.onChange = ImageObject.OnChange.bind(this);
	if(this.ownChangeHandlers === null)
		this.ownChangeHandlers = new MultiFunction();
	if(this.changeHandlers === null)
		this.changeHandlers = new MultiFunction();
}

ImageObject.prototype.beforeOwnChange = function beforeOwnCHange(name, oldValue){
	if(oldValue instanceof ImageObject)
		oldValue.unsubscribe(this.onChange);
}

ImageObject.prototype.onOwnChange = function onOwnChange(name, newValue){
	if(!(name in this.changing)){
		this.changing[name] = true;
		//log("update for "+name+" on "+typeName(this));

		this.ownChangeHandlers.call(this, name, newValue);
		this.changeHandlers.call(this, name, newValue);
		if(newValue instanceof ImageObject)
			newValue.subscribe(this.onChange);

		delete this.changing[name];
	}
	else{
		//log("recursive update for "+name+" on "+typeName(this));
	}
}

/**
 * Create a new observable property.
 *
 * @param name	The name of the property.
 * @param value	The initial value of the property.
 */
ImageObject.prototype.newProperty = function newProperty(name, value){
	this.initHandlers();

	this[name] = ko.observable(value);
	this[name].subscribe(
		this.beforeOwnChange.bind(this, name), this, "beforeChange");
	this[name].subscribe(
		this.onOwnChange.bind(this, name));
	if(value instanceof ImageObject)
		value.subscribe(this.onChange);
}

/**
 * Create a new property filled with an observable array.
 *
 * @param name	The name of the property.
 */
ImageObject.prototype.newArrayProperty = function newArrayProperty(name){
	this.initHandlers();

	this[name] = ko.observableArray();
	this[name].subscribe(
		this.beforeOwnChange.bind(this, name), this, "beforeChange");
	this[name].subscribe(
		this.onOwnChange.bind(this, name));
}

/**
 * Subscribe to object change events on this object.
 *
 * @param callback	The function to call when a change occurs, signature:
 * 					callbck(source, name, newValue)
 */
ImageObject.prototype.subscribe = function subscribe(callback){
	this.initHandlers();


	this.changeHandlers.add(callback);
}

/**
 * Unsubscribe to object change events on this object.
 *
 * @param callback	The function originally used to subscribe.
 */
ImageObject.prototype.unsubscribe = function unsubscribe(callback){
	this.changeHandlers.remove(callback);
}

/**
 * Subscribe to object change-own-property events on this object.
 *
 * @param callback	The function to call when a change occurs, signature:
 * 					callbck(source, name, newValue)
 */
ImageObject.prototype.subscribeOwn = function subscribeOwn(callback){
	this.initHandlers();

	this.ownChangeHandlers.add(callback);
}

/**
 * Unsubscribe to object change-own-property events on this object.
 *
 * @param callback	The function originally used to subscribe.
 */
ImageObject.prototype.unsubscribeOwn = function unsubscribeOwn(callback){
	this.ownChangeHandlers.remove(callback);
}

ImageObject.prototype.lookupProperty = function lookupProperty(path){
	var properties = path.split(/\./);
	var prop = null;
	var th = this;

	for(prop in properties){
		prop = properties[prop];

		if(th instanceof Function)
			th = th();

		if(th !== undefined && th !== null)
			th = th[prop];
	}

	return th === this? null : th;
}
