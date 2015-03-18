// todo create canvas


function CanvasDrawer () {
	this.id = null;
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
	createCanvas : function () {
		var canvas = document.createElement('canvas');

		document.body.appendChild(canvas);

		this.canvas = canvas;
		this.context =  this.canvas.getContext('2d');
		this.canvas.width = this.width;
		this.canvasWidth = this.canvas.width;
		this.canvas.height = this.height;
		this.canvasHeight = this.canvas.height;

		console.log(this.canvas)
	},

	draw : function () {

	}
};