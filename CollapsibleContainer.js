function CollapsibleContainer(base, parentWidget){
	this.constructor = CollapsibleContainer;

	if(base)
		this.init(base, parentWidget);
}

CollapsibleContainer.prototype = new ContentWidget();
Widget.autoWidget["collapsibleContainer"] = CollapsibleContainer;

CollapsibleContainer.prototype.templateName = "#collapsible-container-template";

CollapsibleContainer.prototype.init = function init(base, parentWidget){
	this.newProperty("buttonLabel", "Content");
	this.newProperty("collapsed", true);

	this.buttonDisplayLabel = ko.computed(function (){
			if(this.collapsed())
				return this.buttonLabel() + " ►";
			else
				return this.buttonLabel() + " ▼";
		}.bind(this));

	ContentWidget.prototype.init.call(this, base, parentWidget);

	this.rollup(this.contentContainer);
}

CollapsibleContainer.prototype.setContent = function setContent(content){
	this.container.append(content.element);
	if(this.collapsed())
		this.rollup(this.container);
}

CollapsibleContainer.prototype.onClick = function (){
	this.collapsed(!this.collapsed());
	this.rollup(this.contentContainer);
}
