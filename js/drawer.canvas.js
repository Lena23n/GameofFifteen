// todo create canvas


function CanvasDrawer () {
	this.canvas = null;
	this.context = null;
	this.canvasWidth = null;
	this.canvasHeight = null;
	this.width = 500;
	this.height = 500;

	this.cellSize = {
		w: null,
		h: null
	};
}

CanvasDrawer.prototype =  {
	createCanvas : function (w, h) {
		this.canvas = document.createElement('canvas');
		this.context =  this.canvas.getContext('2d');
		this.canvas.width = this.width;
		this.canvasWidth = this.canvas.width;
		this.canvas.height = this.height;
		this.canvasHeight = this.canvas.height;

		this.cellSize.w = this.canvasWidth/w;
		this.cellSize.h = this.canvasHeight/h;
	},

	drawCell : function (text, x, y) {
		var cellW = this.cellSize.w,
			cellH = this.cellSize.h,
			graphX = x*cellW,
			graphY = y*cellH,
			cellWPadding = this.cellSize.w - 4,
			cellHPadding = this.cellSize.h - 4,
			graphXPadding = x*cellW + 2,
			graphYPadding = y*cellH + 2,
			textX = graphX+(cellW/2),
			textY = graphY+(cellH/2);

		this.context.fillStyle = "#603D61";
		this.context.strokeStyle = "#503251";
		this.context.font = "italic 14pt Arial";
		this.context.textBaseline = 'middle';
		this.context.textAlign = "center";
		this.context.fillRect(graphXPadding, graphYPadding, cellWPadding, cellHPadding);
		this.context.strokeRect(graphXPadding, graphYPadding, cellWPadding, cellHPadding);

		if (text == 0) {
			this.context.fillStyle = "#69486B";
			this.context.fillRect(graphX, graphY, cellW, cellH);
			this.context.strokeStyle = "transparent";
			this.context.strokeRect(graphX, graphY, cellW, cellH);
		} else {
			this.context.fillStyle = "#ffffff";
			this.context.fillText(text, textX, textY);
		}
	},

	drawField : function (field) {
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		var x,
			y,
			fieldWidth = 4;

		for ( var i = 0; i < field.length; i++) {
			var text = field[i];
			x = i % fieldWidth;
			y = Math.floor(i/fieldWidth);
			this.drawCell(text, x, y);
		}
	}
};


