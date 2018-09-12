var game = {
	init: function() {

		this.tatooineRoom = new TatooineRoom("tatooine");
		this.tatooineRoom.init();
		this.tatooineRoom.enter();
		
		requestAnimationFrame(mainLoop);
	}
}

class TatooineRoom extends Room {

	init() {	
		super.init();

		this.walkbox = new Walkbox([ { x: 0, y: 135 }, { x: 460, y: 135 }, { x: 460, y: 238 }, { x: 0, y: 238 } ])
		this.walkbox.activate();

		this.mainActor = new MovingActor('./resources/r2d2-sheet.png');
		this.mainActor.dimensions = { width: 36, height: 45 };
		this.mainActor.origin = { x: -36 / 2, y: -40 };
		
		this.tower = new Prop('./resources/tower.png');
		this.tower.origin = { x: -58 / 2, y: -161 };
		this.tower.dimensions = { width: 58, height: 161 };
		this.tower.position = {x: 430, y: 176 };

		var _this = this;

		engine.onTarget = function(event) {
			game.tatooineRoom.mainActor.moveTo(event.detail, _this.walkbox);
		};
	}

	enter() {

		super.enter();

		this.mainActor.position = { x: 230, y: 180};
		this.mainActor.show();

		this.tower.show();

	}

}


engine.init();
game.init();
