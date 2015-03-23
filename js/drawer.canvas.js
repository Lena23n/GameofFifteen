// todo create canvas


function CanvasDrawer () {
	this.canvas = null;
	this.context = null;
	this.canvasWidth = null;
	this.canvasHeight = null;
	this.width = 500;
	this.height = 500;
	this.chips = [];

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

	move : function (array,clicked,empty) {

		//var fpsInterval,
		//	timeBefore,
		//	requestId,
		//	now,
		//	elapsed,
		//	self = this;

		//var cellWPadding = this.cellSize.w - 4,
		//	cellHPadding = this.cellSize.h - 4,
		//	emptyCellX = this.chips[empty].x,
		//	emptyCellY = this.chips[empty].y,
		//	emptyText = this.chips[empty].value,
		//	temp = this.chips[clicked],
		//	tempX = this.chips[clicked].x,
		//	tempY = this.chips[clicked].y,
		//	tempText = this.chips[clicked].value;
		//
		//this.context.clearRect(tempX*this.cellSize.w, tempY*this.cellSize.h, cellWPadding, cellWPadding);
		////this.context.clearRect(emptyCellX*this.cellSize.w, emptyCellY*this.cellSize.h, cellWPadding, cellWPadding);
		////this.drawCell(emptyText, emptyCellX,emptyCellY);
		//this.drawCell(tempText, tempX, tempY);
		//
		//this.chips[clicked] = this.chips[empty];
		//this.chips[empty] = temp;
		//
		//this.chips[empty].x = tempX;
		//this.chips[empty].y = tempY;
		//this.chips[clicked].x = emptyCellX;
		//this.chips[clicked].y = emptyCellY;
		//
		//console.log(this.chips[empty], this.chips[clicked]);
		//this.drawField(array);
		//this.drawCell(emptyText, emptyCellX,emptyCellY);
		//this.context.clearRect(tempX, tempY, cellWPadding, cellWPadding);


		//function startTick() {
		//	timeBefore = Date.now();
		//	tick();
		//}
		//
		//function tick() {
		//	fpsInterval = 10;
		//
		//	requestAnimationFrame(tick);
		//
		//	//if (!self.stopped) {
		//		requestId = requestAnimationFrame(tick);
		//	//}
		//	now = Date.now();
		//	elapsed = now - timeBefore;
		//
		//	if (elapsed > fpsInterval) {
		//		timeBefore = now - (elapsed % fpsInterval);
		//		self.drawField(array);
		//
		//	} else {
		//		self.drawField(array);
		//	}
		//}
		//	startTick();

		var emptyCellDiv = this.chips[empty],
			clickedCellDiv = this.chips[clicked],
			cellW = this.cellSize.w,
			cellH = this.cellSize.h,
			cellWPadding = this.cellSize.w - 4,
			cellHPadding = this.cellSize.h - 4,
			fieldWidth = 4,
			clickedX = this.chips[clicked].x*cellW + 1,
			clickedY = this.chips[clicked].y*cellH + 1,
			emptyX = (this.chips[empty].x % fieldWidth)*cellW + 1,
			emptyY = (Math.floor(this.chips[empty].y/fieldWidth))*cellH + 1;

		this.context.clearRect(clickedX, clickedY, cellW,cellH);

		this.chips[empty].value = this.chips[clicked].value;

		this.drawCell(this.chips[empty].value, this.chips[empty].x, this.chips[empty].y);
	},

	drawField : function (field) {
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.chips = [];

		var x,
			y,
			fieldWidth = 4;

		this.context.translate(0, 0);
		for ( var i = 0; i < field.length; i++) {
			var text = field[i];

			x = i % fieldWidth;
			y = Math.floor(i/fieldWidth);

			var chip = {
				value:text,
				x: x,
				y: y
			};
			this.chips.push(chip);
			this.drawCell(text, x, y);
		}
	}
};


