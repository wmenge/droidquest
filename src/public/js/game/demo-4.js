class DemoRoom4 extends Room {

	init() {	
		super.init();

		this.walkbox = new Walkbox([ { x: 0, y: 135 }, { x: 460, y: 135 }, { x: 460, y: 238 }, { x: 0, y: 238 } ])
		this.walkbox.activate();

		this.r2d2 = new Actor('r2d2')
			.setOrigin({ x: 36 / 2, y: 40 });

		this.threecpo = new Actor('c3po')
			.setOrigin({ x: 44 / 2, y: 70 });

		this.tower = new Prop('tower')
			.setOrigin({ x: 58 / 2, y: 161 })
			.setPosition({x: 430, y: 176 });

		var _this = this;

		// Clicking droid makes droid the main actor
		this.r2d2.onTarget = function() {

			_this.mainActor = _this.r2d2;
			_this.threecpo.onMoveStart = null;
			_this.r2d2.onMoveStart = function(target) {
				setTimeout(async function() { 
					await _this.threecpo.moveTo({ x: target.x - 20, y: target.y - 20 }, _this.walkbox);
					_this.threecpo.orientation = _this.r2d2.orientation;
				 }, 750);

			};
		};

		this.threecpo.onTarget = function() {
			_this.mainActor = _this.threecpo;
			_this.r2d2.onMoveStart = null;
			_this.threecpo.onMoveStart = function(target) {
				setTimeout(async function() { 
					await _this.r2d2.moveTo({ x: target.x - 20, y: target.y - 20 }, _this.walkbox);
					_this.r2d2.orientation = _this.threecpo.orientation;
				 }, 750);

			};

		};

		engine.onTarget = function(event) {
			if (_this.mainActor) {
				_this.mainActor.moveTo(event.detail, _this.walkbox);
			}
		};
	}

	onEnter() {

		super.onEnter();

		this.r2d2.setPosition({ x: 115, y: 180});
		this.r2d2.show();

		this.threecpo.setPosition({ x: 345, y: 180});
		this.threecpo.show();

		this.tower.show();

		this.text = new Text("Tech demo 4: Follow the leader\nFirst, click to select a droid to be the leader; then click to move him)")
			.setPosition({ x: 10, y: 5 })
			//.addClassName('small')
			//.addClassName('outline')
			.show();

	}

	onExit() {
		super.onExit();
		this.walkbox.deactivate();
	}

}

function demo4() {
	game.show(new DemoRoom4("tatooine"));
}
