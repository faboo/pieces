function CharacterEditor(base){
	this.constructor = CharacterEditor;
	this.templateName = "#character-editor-template";
	this.gridColor = "rgba(55, 55, 55, 0.8)";
	if(base)
		this.init(base);
}

CharacterEditor.prototype = new Editor();

CharacterEditor.prototype.init = function init(base, parentWidget){
	Editor.prototype.init.call(this, base, parentWidget);
}

CharacterEditor.prototype.load = function load(template){
	Editor.prototype.load.call(this, template);
	if(this.partsEditor)
		this.partsEditor.parts(this.scene().parts);
}

CharacterEditor.prototype.draw = function draw(){
	this.context.save();
	this.moveToCenter();

	Editor.prototype.draw.call(this);
	this.context.restore();

	this.drawGrid();
}

CharacterEditor.prototype.clearCanvas = function clearCanvas(){
	var ycenter = this.canvas.height/2;
	var xcenter = this.canvas.width/2;

	this.context.clearRect(-xcenter, -ycenter, this.canvas.width, this.canvas.height);
}

CharacterEditor.prototype.partUnderPoint = function partUnderPoint(x, y){
	var inside = null;
	this.context.save();
	this.moveToCenter();

	inside = Editor.prototype.partUnderPoint.call(this, x, y);

	this.context.restore();

	return inside;
}

CharacterEditor.prototype.moveToCenter = function moveToCenter(){
	var ycenter = this.canvas.height/2;
	var xcenter = this.canvas.width/2;

	this.context.translate(xcenter, ycenter);
}

CharacterEditor.prototype.drawGrid = function drawGrid(){
	var ycenter = this.canvas.height/2;
	var xcenter = this.canvas.width/2;

	this.context.save();
	this.context.strokeStyle = this.gridColor;

	// vertical line
	this.context.beginPath();
	this.context.moveTo(xcenter, 0);
	this.context.lineTo(xcenter, this.canvas.height);
	this.context.closePath();
	this.context.stroke();

	// horizontal line
	this.context.beginPath();
	this.context.moveTo(0, ycenter);
	this.context.lineTo(this.canvas.width, ycenter);
	this.context.closePath();
	this.context.stroke();

	this.context.restore();
}

CharacterEditor.prototype.onAddEllipsoid = function onAddEllipsoid(){
	var part = this.scene().newPartContainer("Ellipsoid");

	this.scene().parts.push(part);
	this.select(part);

	this.onEdit();
}
