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
		var x,
			y,
			fieldWidth = this.fieldSize.w;

		for ( var i = 0; i < array.length; i++) {
			var text = array[i];
			x = i % fieldWidth;
			y = Math.floor(i/fieldWidth);
			this.drawer.drawCell(text, x, y);
		}
	/*	var count = 0;
		for (var i = 0; i < array.length; i++) {
			var x,
				y;

			if (count < 4) {
				x = i;
				y = 0;
			} else if (count < 8) {
				x = i-4;
				y = 1;
			} else if (count < 12) {
				x = i-8;
				y = 2;
			} else {
				x = i-12;
				y = 3;
			}

			this.drawer.drawCell(text, x, y);
			count++;
		}*/
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

		var emptyCellPosition = this.gameArray.indexOf(0);

		// diff between i and emptyCellPos : +1, -1, +w, -w
		// diff [between i and emptyCellPos] : 1, w

		if (this.gameArray[i] == 0) {

		}
	},

	changeCells : function (clicked) {

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