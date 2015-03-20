
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

	this.isPuzzleSolved = false;
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
		this.isPuzzleSolved = false;
		/*	this.shuffle(this.gameArray);*/
		this.drawer.drawField(this.gameArray);

	},

	shuffle : function (array) {
		// todo implement isFieldSolvable
		return array.sort(function(){return Math.random() > 0.5});

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
			emptyCellRow = Math.floor(emptyCellPosition / this.fieldSize.w),
			currentCellRow = Math.floor(i / this.fieldSize.w),
			isSameRowSiblings = emptyCellRow == currentCellRow;

		if (isRowSiblings && isSameRowSiblings || isColumnSiblings) {
			this.exchangeCells(i, emptyCellPosition);
		}

		this.checkWinArray(this.gameArray);

		if (this.isPuzzleSolved) {
			alert('Вы победили!');
			this.endGame();
		}

	},

	checkWinArray : function (gameArray) {
		this.isPuzzleSolved = true;

		for (var i = 0; i < gameArray.length - 2; i++) {
			var currentChip = gameArray[i],
				nextChip = gameArray[i + 1];

			if (nextChip < currentChip) {
				this.isPuzzleSolved = false;
				break;
			}
		}
	},



	exchangeCells : function (clickedCell,emptyCell) {
		var temp = this.gameArray[clickedCell];
		this.gameArray[clickedCell] = this.gameArray[emptyCell];
		this.gameArray[emptyCell] = temp;

		this.drawer.drawField(this.gameArray);
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