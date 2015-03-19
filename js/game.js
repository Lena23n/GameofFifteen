function Game (id) {
	this.id = id;
	this.fieldSize = {
		w: 4,
		h: 4
	};
	this.gameArray = [];
	this.drawer = new CanvasDrawer();
	this.holder = null;
	this.canvasOffsetX = null;
	this.canvasOffsetY = null;
	//this.drawer.drawCell(this.gameArray)
}

Game.prototype =  {
	init : function () {
		var self = this;

		this.drawer.createCanvas(this.fieldSize.w, this.fieldSize.h);
		this.holder = document.getElementById(this.id);

		// todo create 'holder' element for game
		this.holder.addEventListener('click', function (e) {
			self.clickEvent(e);
		});

		this.canvasOffsetX = this.holder.offsetLeft;
		this.canvasOffsetY = this.holder.offsetTop;

		this.startGame();
	},

	attachToDOM : function (id) {
		document.getElementById(id).appendChild(this.drawer.element);
	},

	startGame : function () {
		// todo don't use different data types in array
		this.gameArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
		this.attachToDOM(this.id);
		this.shuffle(this.gameArray);
		this.drawGameItems(this.gameArray);
		console.log(this.gameArray.indexOf(0))
	},

	shuffle : function (array) {
		return array.sort(function(){return Math.random() > 0.5});
	},

	drawGameItems : function (array) {
		this.drawer.context.clearRect(0, 0, this.drawer.canvasWidth, this.drawer.canvasHeight);
		var x,
			y,
			fieldWidth = this.fieldSize.w;

		for ( var i = 0; i < array.length; i++) {
			var text = array[i];
			x = i % fieldWidth;
			y = Math.floor(i/fieldWidth);
			this.drawer.drawCell(text, x, y);
		}
	},

	clickEvent : function (e) {
		this.defineCoords(e);
	},

	defineCoords : function (e) {
		var x = Math.floor((e.clientX - this.canvasOffsetX)/this.drawer.cellSize.w);
		var y = Math.floor((e.clientY - this.canvasOffsetY)/this.drawer.cellSize.h);

		this.checkCells(x, y);
	},

	checkCells : function (x, y) {
		var i = (this.fieldSize.w*y)+x;

		var emptyCellPosition = this.gameArray.indexOf(0),
			emptyCellPositionX = emptyCellPosition % this.fieldSize.w,
			emptyCellPositionY = Math.floor(emptyCellPosition / this.fieldSize.w),
			topCellX = x == emptyCellPositionX,
			topCellY = y+1 == emptyCellPositionY,
			bottomCellX = x == emptyCellPositionX,
			bottomCellY = y-1 == emptyCellPositionY,
			leftCellX = x+1 == emptyCellPositionX,
			leftCellY = y == emptyCellPositionY,
			rightCellX = x-1 == emptyCellPositionX,
			rightCellY = y == emptyCellPositionY;

		var coordsOfAllBlocks = {
			0 : [0, 0],
			1 : [1, 0],
			2 : [2, 0],
			3 : [3, 0],
			4 : [0, 1],
			5 : [1, 1],
			6 : [2, 1],
			7 : [3, 1],
			8 : [0, 2],
			9 : [1, 2],
			10 : [2, 2],
			11 : [3, 2],
			12 : [0, 3],
			13 : [1, 3],
			14 : [2, 3],
			15 : [3, 3]
		};

		if ( topCellX && topCellY||bottomCellX && bottomCellY||leftCellX && leftCellY||rightCellX && rightCellY) {
			this.exchangeCells(i,emptyCellPosition);
		}

		// diff between i and emptyCellPos : +1, -1, +w, -w
		// diff [between i and emptyCellPos] : 1, w

		console.log(i,emptyCellPosition);

	},

	exchangeCells : function (clickedCell,emptyCell) {
		var temp = this.gameArray[clickedCell];
		this.gameArray[clickedCell] = this.gameArray[emptyCell];
		this.gameArray[emptyCell] = temp;

		this.drawGameItems(this.gameArray);
	},

	endGame : function () {

		this.startGame();
	}
};

function loadPage () {
	var game = new Game('game');
	game.init();
}

window.addEventListener('load', loadPage);