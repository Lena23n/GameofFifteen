// todo create canvas


function CanvasDrawer () {
	this.canvas = null;
	this.context = null;
	this.canvasWidth = null;
	this.canvasHeight = null;
	this.width = 500;
	this.height = 500;
	this.chips = [];
	this.duration = 400;
	this.fieldSize = {
		w: 4,
		h: 4
	};
	this.isAnimate = false;

	this.cellSize = {
		w: null,
		h: null
	};
}

CanvasDrawer.prototype =  {
	createField : function (w, h) {
		this.field = document.createElement('canvas');
		this.context =  this.field.getContext('2d');
		this.field.width = this.width;
		this.canvasWidth = this.field.width;
		this.field.height = this.height;
		this.canvasHeight = this.field.height;

		this.cellSize.w = this.width/w;
		this.cellSize.h = this.height/h;
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

		if (text !== 0) {
			this.context.fillStyle = "#603D61";
			this.context.strokeStyle = "#503251";
			this.context.font = "italic 14pt Arial";
			this.context.textBaseline = 'middle';
			this.context.textAlign = "center";
			this.context.fillRect(graphXPadding, graphYPadding, cellWPadding, cellHPadding);
			this.context.strokeRect(graphXPadding, graphYPadding, cellWPadding, cellHPadding);
			this.context.fillStyle = "#ffffff";
			this.context.fillText(text, textX, textY);
		}
	},

	move : function (array,clicked,empty) {
		var self = this,
			now,
			dTime,
			startTime,
			diffX,
			diffY,
			dx,
			dy,
			frameCount,
			milliSecPerFrame = 16;

		if (self.isAnimate) {
			return false;
		}

		this.isAnimate = true;

		startTime = Date.now();

		var tick = function () {
			var emptyCell = self.chips[empty],
				clickedCell = self.chips[clicked];

			now = Date.now();

			dTime = now - startTime;

			diffX = emptyCell.x - clickedCell.x;
			diffY = emptyCell.y - clickedCell.y;

			frameCount = (self.duration - dTime + milliSecPerFrame)/milliSecPerFrame;

			dx = diffX/frameCount;
			dy = diffY/frameCount;

			clickedCell.x += dx;
			clickedCell.y += dy;

			if (dTime > self.duration) {
				self.drawField(array);
				self.isAnimate = false;
			}


			self.redrawField(self.chips);

			if (self.isAnimate) requestAnimationFrame(tick);
		};

		tick();
	},

	redrawField : function (field) {
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		for ( var i = 0; i < field.length; i++) {
			var x = field[i].x,
				y = field[i].y,
				text = field[i].value;

			this.drawCell(text, x, y);
		}
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


