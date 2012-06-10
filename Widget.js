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

function Widget(){
	this.templateName = null;
	this.element = null;
	this.onClose = null;
}

Widget.prototype = new ImageObject();

Widget.HasFocus = null;

Widget.keypressHandler = function keypressHandler(event){
	if(Widget.HasFocus !== null)
		return Widget.HasFocus.onKeypress(event);
}

Widget.keydownHandler = function keydownHandler(event){
	if(Widget.HasFocus !== null)
		return Widget.HasFocus.onKeydown(event);
}

$(window).keypress(Widget.keypressHandler);
$(window).keydown(Widget.keydownHandler);

Widget.autoWidget = { }

Widget.prototype.init = function init(base, parentWidget){
	this.newProperty("parentWidget", parentWidget);
	this.applyTemplate($(base));
	this.bind();
}

Widget.prototype.applyTemplate = function applyTemplate(base){
	var template = $(this.templateName)[0].text;
	var th = this;
	var elms = null;
	var id = null;
	var auto = null;
	var autoAct = null;

	this.element = $(template);
	if(base){
		this.copyElmAttrs(base, this.element);
		base.append(this.element.children());
		this.element = base;
		$();
	}

	elms = this.element.find('[id]');
	for(id = 0; id < elms.length; ++id)
		this[elms[id].getAttribute('id')] = $(elms[id]);

	// We might overwrite elms we collected above, but that's okay.
	for(auto in Widget.autoWidget){
		autoAct = Widget.autoWidget[auto];
		// We want elements with the auto class that aren't already populated.
		elms = this.element.find('.'+auto).filter(":empty");
		elms.each(function(){
			var widget = typeof autoAct === "string"?
				$(this)[autoAct]() :
				new autoAct(this, th);

			if(this.hasAttribute('id'))
				th[this.getAttribute('id')] = widget;
		});
	}

	return this.element;
}

Widget.prototype.copyElmAttrs = function copyElmAttrs(to, from){
	var idx = null;
	var attr = null;

	to.addClass(from.attr("class"));

	for(idx = 0; idx < from[0].attributes.length; ++idx){
		attr = from[0].attributes[idx];

		if(attr.name !== "class")
			to.attr(attr.name, attr.value);
		else if(attr.name === "data-bind")
			to.attr(attr.name, attr.value + ", " + to.attr("data-bind"));
		else if(attr.name === "bind")
			to.attr(attr.name, attr.value + ", " + to.attr("bind"));
	}
}

Widget.prototype.bind = function bind(){
	this.linkForm(this.element, this);

	if(this.parentWidget())
		this.applyPropertyBindings();
}

Widget.prototype.applyPropertyBindings = function applyPropertyBindings(recall){
	var bindings = this.element.attr('bind');
	var bind = null;
	var prop = null;
	var value = null;

	if(bindings){
		bindings = bindings.split(/ *, */);

		for(bind in bindings){
			bind = bindings[bind].split(/ *: */);
			prop = bind[0];
			value = bind[1];
			if(value === "this")
				value = this.parentWidget();
			else
				value = this.parentWidget().lookupProperty(value);

			if(this[prop] instanceof Function)
				this[prop](value instanceof Function? value() : value);
			else
				this[prop] = value;
		}

		if(!recall)
			this.subscribe(function () {
					this.applyPropertyBindings(true)
				}.bind(this));
	}
}

Widget.prototype.linkForm = function linkForm(form, obj){
	if(0 in form)
		form = form[0];
	ko.applyBindings(obj, form);
}

Widget.prototype.close = function close(){
	this.element.remove();
	if(this.onClose)
		this.onClose();
}

Widget.prototype.rollup = function rollup(element){
	$(element).toggle( "blind", {}, 500 );
}

Widget.prototype.takeFocus = function takeFocus(){
	log("Taking focus for "+this.constructor.name);
	Widget.HasFocus = this;
}

Widget.prototype.releaseFocus = function releaseFocus(){
	log("Releasing focus from "+this.constructor.name);
	Widget.HasFocus = null;
}

Widget.prototype.onKeypress = function onKeypress(event){
	return true;
}

Widget.prototype.onKeydown = function onKeydown(event){
	return true;
}

Widget.prototype.fillInMouseEvent = function fillInMouseEvent(event){
	if(event.offsetX === undefined)
		event.offsetX = event.clientX - event.target.offsetLeft;
	if(event.offsetY === undefined)
		event.offsetY = event.clientY - event.target.offsetTop;
}

Widget.prototype.zIndex = function zIndex(set){
	if(set != undefined)
		this.element.zIndex(set);
	return this.element.zIndex();
}

Widget.prototype.minWidth = function minWidth(set){
	if(set != undefined)
		this.element.css("min-width", set);
	return this.element.css("min-width");
}

Widget.prototype.minHeight = function minHeight(set){
	if(set != undefined)
		this.element.css("min-height", set);
	return this.element.css("min-height");
}
