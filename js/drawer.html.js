function HtmlDrawer () {
	this.htmlField = null;
	this.width = 500;
	this.height = 500;


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

	},

	drawField : function (field) {
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