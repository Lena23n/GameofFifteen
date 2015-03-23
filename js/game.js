function Game (id) {
	this.id = id;
	this.fieldSize = {
		w: 4,
		h: 4
	};
	this.gameArray = [];
	this.drawer = new CanvasDrawer();
	this.drawerHtml = new HtmlDrawer();
	this.holder = null;
	this.offSetX = null;
	this.offSetY = null;
	this.isPuzzleSolved = false;
	this.isCanvasChosen = false;
	this.isHtmlChosen = false;
	this.canvasButton = null;
	this.htmlButton = null;
	this.celldSize = {
		w: null,
		h: null
	};
}

Game.prototype =  {
	init : function () {
		var self = this;
		this.drawer.createCanvas(this.fieldSize.w, this.fieldSize.h);
		this.drawerHtml.createHtmlField(this.fieldSize.w, this.fieldSize.h);
		this.createButton();

		this.holder = document.getElementById(this.id);

		// todo create 'holder' element for game
		this.holder.addEventListener('click', function (e) {
			self.clickEvent(e);
		});

		this.canvasButton.addEventListener('click', function () {
			self.canvasButtonClicked();
		});

		this.htmlButton.addEventListener('click', function () {
			self.htmlButtonClicked();
		});

		this.offSetX = this.holder.offsetLeft;
		this.offSetY = this.holder.offsetTop;

		this.startGame();
	},

	createButton : function () {
		var divWrap = document.createElement('div'),
			divCanvasButton = document.createElement('div'),
			divHtmlButton = document.createElement('div'),
			sibling = document.getElementById(this.id),
			wrap;

		wrap = document.body.insertBefore(divWrap, sibling);
		wrap.setAttribute('class','wrap');

		this.canvasButton = wrap.appendChild(divCanvasButton);
		this.canvasButton.setAttribute('class','canvas-btn');
		this.canvasButton.textContent = 'Canvas';

		this.htmlButton = wrap.appendChild(divHtmlButton);
		this.htmlButton.setAttribute('class','html-btn');
		this.htmlButton.textContent = 'Html';

	},

	startGame : function () {
		// todo don't use different data types in array
		this.gameArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
		this.isCanvasChosen = true;

		this.isPuzzleSolved = false;
		this.shuffle(this.gameArray);

		var isFieldSolvable = this.isFieldSolvable();
		while(!isFieldSolvable) {
			var k = 'Перемешал';
			this.shuffle(this.gameArray);
			isFieldSolvable = this.isFieldSolvable();
			console.log(k);
		}

		this.checkClickedButton();
	},

	attachToDOM : function (id,child) {
		document.getElementById(id).appendChild(child);
	},

	clearHolder : function () {
		this.holder.innerHTML = "";
	},

	shuffle : function (array) {
		return array.sort(function(){return Math.random() > 0.5});
	},

	isFieldSolvable : function () {
		var k = 0,
			isOdd,
			i,
			j,
			emptyCellRow;

		// k = count of pairs in which previous number greater than next number

		for (i = 1; i < this.gameArray.length; i++) {
			for (j = i - 1; j >= 0; j--) {
				if(this.gameArray[j] > this.gameArray[i]) {
					k++
				}
			}
		}

		for (i = 0; i < this.gameArray.length; i++) {
			if (this.gameArray[i] == 0) {
				emptyCellRow = Math.ceil(i/4);
			}
		}

		isOdd = !!((k+emptyCellRow)%2);
		return isOdd;
	},

	clickEvent : function (e) {
		this.defineCoords(e);
	},

	checkClickedButton : function () {

		if (this.isCanvasChosen) {

			this.attachToDOM(this.id,this.drawer.canvas);
			this.drawer.drawField(this.gameArray);
			this.canvasButton.classList.add('active');
			this.htmlButton.classList.remove('active');

			this.celldSize.w = this.drawer.cellSize.w;
			this.celldSize.h = this.drawer.cellSize.h;

		} else if (this.isHtmlChosen) {

			this.attachToDOM(this.id, this.drawerHtml.htmlField);
			this.drawerHtml.drawField(this.gameArray);
			this.htmlButton.classList.add('active');
			this.canvasButton.classList.remove('active');

			this.celldSize.w = this.drawerHtml.cellSize.w;
			this.celldSize.h = this.drawerHtml.cellSize.h;
		}
	},

	canvasButtonClicked : function () {
		this.clearHolder();
		this.isCanvasChosen = true;
		this.isHtmlChosen = false;
		this.checkClickedButton();
	},

	htmlButtonClicked : function () {
		this.clearHolder();
		this.isCanvasChosen = false;
		this.isHtmlChosen = true;
		this.checkClickedButton();
	},

	defineCoords : function (e) {
		var x = Math.floor((e.clientX - this.offSetX)/this.celldSize.w);
		var y = Math.floor((e.clientY - this.offSetY)/this.celldSize.h);
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
			this.exchangeCells(i, x, y, emptyCellPosition);
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

	exchangeCells : function (clickedCell, clickedCellX, clickedCellY, emptyCell) {
		var temp = this.gameArray[clickedCell];
		this.gameArray[clickedCell] = this.gameArray[emptyCell];
		this.gameArray[emptyCell] = temp;


		if (this.isCanvasChosen) {
			//this.drawer.drawField(this.gameArray);
			this.drawer.move(this.gameArray, clickedCell, emptyCell);
		} else if (this.isHtmlChosen) {
			this.drawerHtml.move(clickedCell, clickedCellX, clickedCellY, emptyCell);
		}
	},

	endGame : function () {
		this.clearHolder();
		this.startGame();
	}
};

function loadPage () {
	var game = new Game('game');
	game.init();
}

window.addEventListener('load', loadPage);