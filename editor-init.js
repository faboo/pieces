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

function toScript(obj){
    var type = typeof (obj);
    var s;
    var idx;
	var hasProps = false;

	for(var prop in obj){
		hasProps = true;
		break;
	}

    if(obj === undefined || obj === null)
        return "" + obj;
    else if(type === 'string')
        return '"'+obj.replace(/"/g, '\\"').replace(/\n/g, '\\n').
            replace(/\t/g, '\\t').replace(/\r/g, '\\r')+'"';
    else if(type === 'number')
        return "" + obj;
    else if(type === 'boolean')
        return "" + obj;
    else if(type === 'function' && !hasProps)
        return obj.toString();
    else if(obj instanceof RegExp)
        return new String(obj);
    else if(obj instanceof Array){
        s = '[';
        for (idx = 0; idx < obj.length; ++idx){
            s += toScript(obj[idx]);
            if(idx < obj.length - 1)
                s += ',';
        }
        return s + ']';
    }
    else {
        s = '{';
        try {
            for (idx in obj){
                s += idx + ": " + toScript(obj[idx]) + ',';
            }
        }
        catch (ex){
            s += "[COM OBJECT]";
        }
        return s.replace(/,?$/, "}");
    }
}

function keys(dict){
	var prop = null;
	var arr = [];

	for(prop in dict)
		arr.push(prop);

	return arr;
}

function log(msg){
	console.log(msg);
}

function typeName(value){
	var name = Object.prototype.toString(value).replace(/^\[object (.*)\]$/, "$1");

	if(name === "Object"){
		if(value === null)
			name = "null";
		else if(value === undefined)
			name = "undefined";
		else if(value instanceof String)
			name = "string"
		else if(value instanceof Number)
			name = "number"
		else
			name = value.constructor.name || "Object";
	}

	return name;
}

ko.bindingProvider['instance']['getBindings'] = function(node, bindingContext) {
	try{
		var bindingsString = this['getBindingsString'](node, bindingContext);
		return bindingsString ? this['parseBindingsString'](bindingsString, bindingContext) : null;
	}
	catch(ex){
		console.log("Binding failed: "+ex);
		return null;
	}
};

ko.bindingHandlers.parentWidget = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		element.parentWidget = ko.observable(viewModel);
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		element.parentWidget(viewModel);
    }
};

function start(){
	application = new Application($(".application"));
}

$(window).load(start);
