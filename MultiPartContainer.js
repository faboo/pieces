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
