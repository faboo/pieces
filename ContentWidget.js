function ContentWidget(base, parentWidget){
	this.constructor = ContentWidget;

	if(base)
		this.init(base, parentWidget);
}

ContentWidget.prototype = new Widget();

ContentWidget.prototype.contentTemplateName = null;

ContentWidget.prototype.init = function init(base, parentWidget){
	var templateName = this.templateName;
	var element = null;
	this.newProperty("parentWidget", parentWidget);

	this.applyTemplate($(base));

	if(this.contentTemplateName){
		element = this.element;
		this.templateName = this.contentTemplateName;
		this.applyTemplate(this.contentContainer);
		this.templateName = templateName;
		this.element = element;
	}

	this.bind();
}
