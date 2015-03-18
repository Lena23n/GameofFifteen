function Game (id) {
	this.fieldSize = {
		w: 4,
		h: 4
	};
	this.gameArray = [];
	this.drawer = new CanvasDrawer();
	this.holder = this.drawer.canvas;
	//this.drawer.draw(this.gameArray)
}

Game.prototype =  {
	init : function () {
		var self = this;

		this.drawer.createCanvas();

		// todo create 'holder' element for game
		/*this.holder.addEventListener('click', function (e) {
			self.clickEvent(e);
		});*/

		this.startGame();
	},

	startGame : function () {

		// todo don't use different data types in array
		//this.gameArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
		this.gameArray = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
		this.shuffle(this.gameArray);
		console.log(this.gameArray)
	},

	shuffle : function (array) {
		var i = 4,
			k = 4,
			temporal,
			j,
			l;
		if(i==0 && k==0) { return array; }
		while (--i && --k) {

				j = Math.floor( Math.random()*i );
				l = Math.floor( Math.random()*k );
				temporal = array[i][k],
					array[i][k] = array[j][l];
					array[j][l] = temporal;
		}
		return array;


	/*	var i = array.length,
			temporal,
			j;
		if(i==0) { return array; }
		while (--i) {
			j = Math.floor( Math.random()*i );
			temporal = array[i],
				array[i] = array [j],
				array[j] = temporal;
		}
		return array;*/
	},

	clickEvent : function (e) {
		//do something
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