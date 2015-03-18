// todo create canvas


function CanvasDrawer () {
	this.canvas = null;
	this.context = null;
	this.canvasWidth = null;
	this.canvasHeight = null;
	this.width = 500;
	this.height = 500;

	this.element = null;

	this.cellSize = {
		w: null,
		h: null
	};
}

CanvasDrawer.prototype =  {
	createCanvas : function (w, h) {
		this.canvas = document.createElement('canvas');
		this.element = this.canvas;
		this.context =  this.canvas.getContext('2d');
		this.canvas.width = this.width;
		this.canvasWidth = this.canvas.width;
		this.canvas.height = this.height;
		this.canvasHeight = this.canvas.height;

		this.cellSize.w = this.canvasWidth/w;
		this.cellSize.h = this.canvasHeight/h;
	},

	drawCell : function (text, x, y) {
		var cellX = this.cellSize.w,
			cellY = this.cellSize.h,
			graphX = x*cellX,
			graphY = y*cellY,
			textX = graphX+(cellX/2),
			textY = graphY+(cellY/2);


		this.context.fillStyle = "#00F";
		this.context.strokeStyle = "#F00";
		this.context.font = "italic 14pt Arial";
		this.context.textBaseline = 'middle';
		this.context.textAlign = "center";
		this.context.strokeRect(graphX, graphY, cellX, cellY);

		if (!text == 0) {
			this.context.fillText(text, textX, textY);
		}
	}
};