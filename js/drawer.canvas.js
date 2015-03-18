// todo create canvas


function CanvasDrawer () {
	this.canvas = null;
	this.context = null;
	this.canvasWidth = null;
	this.canvasHeight = null;
	this.width = 500;
	this.height = 500;

	this.cellSize = {
		x: null,
		y: null
	};
}

CanvasDrawer.prototype =  {
	createCanvas : function (w, h) {
		var canvas = document.createElement('canvas');

		document.body.appendChild(canvas);

		this.canvas = canvas;
		this.context =  this.canvas.getContext('2d');
		this.canvas.width = this.width;
		this.canvasWidth = this.canvas.width;
		this.canvas.height = this.height;
		this.canvasHeight = this.canvas.height;

		this.cellSize.x = this.canvasWidth/w;
		this.cellSize.y = this.canvasHeight/h;
	},

	draw : function (text, x, y) {
		var cellX = this.cellSize.x,
			cellY = this.cellSize.y,
			graphX = x*cellX,
			graphY = y*cellY,
			textX = graphX+(cellX/2),
			textY = graphY+(cellY/2);

		this.context.fillStyle = "#00F";
		this.context.strokeStyle = "#F00";
		this.context.font = "italic 14pt Arial";
		this.context.textBaseline = 'middle';
		this.context.textAlign = "center";
		this.context.fillText(text, textX, textY);
		this.context.strokeRect(graphX, graphY, cellX, cellY);
	}
};