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
			graphX = x * cellW,
			graphY = y * cellH,
			textPaddingTop = (cellW/2)-7,
			div = document.createElement('div');

		this.htmlField.appendChild(div);

		div.style.width = cellW + 'px';
		div.style.height = cellH + 'px';
		div.style.left = graphX + 'px';
		div.style.top = graphY + 'px';
		div.style.paddingTop = textPaddingTop + 'px';
		//div.style.position = 'absolute';
		//div.style.border = '1px solid #503251';
		//div.style.color = 'white';

		if (text == 0) {
			//div.style.background = '#69486B';
			div.setAttribute('class','empty-chip');
		} else {
			//div.style.background = '#603D61';
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