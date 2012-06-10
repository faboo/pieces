var EllipsoidRenderer = {
	trace : function trace(context, canvas, selected){
		var idx = 0;
		var control = null;
		var point = null;

		if(this.parts().length > 1){
			context.beginPath();
			context.moveTo(this.parts()[0].x(), this.parts()[0].y());

			for(idx = 1; idx < this.parts().length - 1; idx += 2){
				control = this.parts()[idx];
				point = this.parts()[idx + 1];
				context.quadraticCurveTo(
					control.x(),
					control.y(),
					point.x(),
					point.y());
			}

			context.closePath();

			return true;
		}
		else{
			return false;
		}
	},

	drawPoints : function drawPoints(context){
		var idx = null;
		var point = null;

		for(idx = 0; idx < this.parts().length; idx += 1){
			point = this.parts()[idx];
			if(idx%2 === 0)
				context.fillStyle = point.showTexture.pattern();
			else
				context.fillStyle = point.showControlTexture.pattern();
			context.fillRect(point.x()-2, point.y()-2, 4, 4);
		}
	}
}
