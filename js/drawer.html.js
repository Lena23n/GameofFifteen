function HtmlDrawer () {
	this.htmlField = null;
	this.width = 500;
	this.height = 500;
	this.chips = [];

	this.isActive = true;

	this.cellSize = {
		w: null,
		h: null
	};
}

HtmlDrawer.prototype = {
	createHtmlField : function (w, h) {
		this.htmlField = document.createElement('div');
		this.htmlField.style.width = this.width + 'px';
		this.htmlField.style.height = this.height + 'px';
		this.htmlField.style.position = 'relative';

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

		this.htmlField.appendChild(div);

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

	move : function (clickedCell, clickedCellX, clickedCellY, emptyCell) {

		// todo isActive -> false

		var emptyCellDiv = this.chips[emptyCell],
			clickedCellDiv = this.chips[clickedCell],
			cellW = this.cellSize.w,
			cellH = this.cellSize.h,
			fieldWidth = 4,
			clickedX = clickedCellX*cellW + 1,
			clickedY = clickedCellY*cellH + 1,
			emptyX = (emptyCell%fieldWidth)*cellW + 1,
			emptyY = (Math.floor(emptyCell/fieldWidth))*cellH + 1;

		emptyCellDiv.style.left = clickedX + 'px';
		emptyCellDiv.style.top = clickedY + 'px';

		clickedCellDiv.style.left = emptyX + 'px';
		clickedCellDiv.style.top = emptyY + 'px';

		// todo onTransitionEnd event -> isActive = true

		this.rewriteChipsInArray(emptyCell, clickedCell);
	},

	rewriteChipsInArray : function (empty, clicked) {
		var temp = this.chips[clicked];
		this.chips[clicked] = this.chips[empty];
		this.chips[empty] = temp;
	},

	drawField : function (field) {
		this.htmlField.innerHTML = "";
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