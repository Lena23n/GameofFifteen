function HtmlDrawer () {
	this.field = null;
	this.width = 500;
	this.height = 500;
	this.chips = [];

	this.fieldSize = {
		w: 4,
		h: 4
	};

	this.isActive = false;

	this.cellSize = {
		w: null,
		h: null
	};
}

HtmlDrawer.prototype = {
	createField : function (w, h) {
		this.field = document.createElement('div');
		this.field.style.width = this.width + 'px';
		this.field.style.height = this.height + 'px';
		this.field.style.position = 'relative';

		this.cellSize.w = this.width/w;
		this.cellSize.h = this.height/h;
	},

	drawCell : function (text, x, y) {
		var cellW = this.cellSize.w,
			cellH = this.cellSize.h,
			cellWPadding = this.cellSize.w - 2,
			cellHPadding = this.cellSize.h - 2,
			graphXPadding = x*cellW + 1,
			graphYPadding = y*cellH + 1,
			textPaddingTop = (cellW/2)-10,
			div = document.createElement('div');

		this.field.appendChild(div);

		div.style.width = cellWPadding + 'px';
		div.style.height = cellHPadding + 'px';
		div.style.left = graphXPadding + 'px';
		div.style.top = graphYPadding + 'px';
		div.style.paddingTop = textPaddingTop + 'px';

		if (text == 0) {
			div.setAttribute('class','empty-chip');
		} else {
			div.textContent = text;
			div.setAttribute('class','chip');
		}
		this.chips.push(div);
	},

	move : function (array, clickedCell, emptyCell) {

		// todo isActive -> false

		if(this.isActive) {
			console.log('ou');
			return false;
		}

		this.isActive = true;

		var clickedCellDiv = this.chips[clickedCell],
			cellW = this.cellSize.w,
			cellH = this.cellSize.h,
			fieldWidth = 4,
			emptyX = (emptyCell%fieldWidth)*cellW + 1,
			emptyY = (Math.floor(emptyCell/fieldWidth))*cellH + 1;

		clickedCellDiv.style.left = emptyX + 'px';
		clickedCellDiv.style.top = emptyY + 'px';


		this.isActive = false;

		this.rewriteChipsInArray(emptyCell, clickedCell);

		//clickedCellDiv.addEventListener('webkitTransitionEnd', this.endAnimation(emptyCell, clickedCell));

	},

	endAnimation : function (emptyCell, clickedCell) {
		console.log('hi');

		this.field.removeEventListener('webkitTransitionEnd', self.endAnimation);

	},

	rewriteChipsInArray : function (empty, clicked) {
		var temp = this.chips[clicked];
		this.chips[clicked] = this.chips[empty];
		this.chips[empty] = temp;
	},

	drawField : function (field) {
		this.field.innerHTML = "";
		this.chips = [];
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