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
