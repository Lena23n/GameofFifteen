function Game (id) {
	this.fieldSize = {
		w: 4,
		h: 4
	};
	this.gameArray = [];
	this.drawer = new CanvasDrawer();
	this.holder = null;
	this.arrayCoords = {
		x: null,
		h: null
	};
	//this.drawer.draw(this.gameArray)
}

Game.prototype =  {
	init : function () {
		var self = this;

		this.drawer.createCanvas(this.fieldSize.w, this.fieldSize.h);
		this.holder = this.drawer.canvas;

		// todo create 'holder' element for game
		this.holder.addEventListener('click', function (e) {
			self.clickEvent(e);
		});

		this.startGame();
	},

	startGame : function () {

		// todo don't use different data types in array
		this.gameArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
		//this.gameArray = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
		this.shuffle(this.gameArray);
		console.log(this.gameArray);
		this.drawGameItems(this.gameArray);
		/*this.drawer.draw(this.gameArray[0], 1,1);*/
	},

	shuffle : function (array) {
		/*var n = 4,
			k = 0,
			temporal,
			l,
			j;

		for (var i = 0; i < n; i++) {
				j = Math.floor( Math.random()*i );
				l = Math.floor( Math.random()*k );
				temporal = array[i][k];
					array[i][k] = array [j][l];
					array[j][l] = temporal;
			k++;
		}*/

		var i = array.length,
			temporal,
			changable;
		if(i==0) { return array; }
		while (i--) {
			changable = Math.floor( Math.random()*i );
			temporal = array[i],
				array[i] = array [changable],
				array[changable] = temporal;
		}
		return array;
	},

	drawGameItems : function (array) {
		var count = 0;
		for (var i = 0; i < array.length; i++) {
			var text = array[i],
				x,
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

			this.drawer.draw(text, x, y);
			count++;
		}
	},

	clickEvent : function (e) {

	},

	endGame : function () {

		this.startGame();
	}
};

function loadPage () {
	var game = new Game();
	game.init();
}

window.addEventListener('load', loadPage);