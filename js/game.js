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
/*	this.isWinEndZero = false;
	this.isWinBeginZero = false;*/

	this.isWinArray = false;
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
		this.gameArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15];
		this.attachToDOM(this.id);
		/*this.isWinEndZero = false;
		this.isWinBeginZero = false;*/
		this.isWinArray = false;
	/*	this.shuffle(this.gameArray);*/
		this.drawGameItems(this.gameArray);

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
		var i = (this.fieldSize.w*y)+ x,
			emptyCellPosition = this.gameArray.indexOf(0),
			positionDifference = Math.abs(i - emptyCellPosition),
			isRowSiblings = (positionDifference == 1),
			isColumnSiblings = (positionDifference == this.fieldSize.w),
			isSameRowSiblings = Math.floor(emptyCellPosition / this.fieldSize.w) == (Math.floor(i / this.fieldSize.w));

		if (isRowSiblings && isSameRowSiblings || isColumnSiblings) {
			this.exchangeCells(i, emptyCellPosition);
		}

		this.checkWinArray(this.gameArray);

		if (this.isWinArray) {
			alert('Вы победили!');
			this.endGame();
		}

		/*this.checkArrayBeginZero(this.gameArray);
		this.checkArrayEndZero(this.gameArray);

		if (this.isWinEndZero || this.isWinBeginZero) {
			alert('Вы победили!');
			this.endGame();
		}*/

	},

	checkWinArray : function (gameArray) {
		for (var i = 0; i < gameArray.length-2; i++) {
			if((gameArray[i] + 1) !== gameArray[i+1]) return false;
		}
		this.isWinArray = true;
	},

	checkArrayBeginZero : function (gameArray) {
		for (var i = 0; i < gameArray.length; i++) {
			if(gameArray[i] !== i) return false;
		}
		this.isWinBeginZero = true;
	},

	checkArrayEndZero : function (gameArray) {
		for (var i = 0; i < gameArray.length - 1; i++) {
			if(gameArray[i] !== i+1) return false;
		}
		this.isWinEndZero = true;
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
