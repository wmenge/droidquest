class DemoRoom6 extends Room {

	init() {	
		super.init();

		this.walkbox = new Walkbox([ 
			{ x: 20, y: 140 }, 
			{ x: 100, y: 80 }, 
			{ x: 360, y: 80 }, 
			{ x: 440, y: 140 }, 
			{ x: 360, y: 200 },
			{ x: 100, y: 200 } ]);
		
		this.walkbox.activate();
		
		this.mainActor = new Actor('r2d2')
			//.setScaleFactor(2)
			.setOrigin({ x: 36 / 2, y: 40 });

		this.tower = new Prop('tower')
			.setOrigin({ x: 58 / 2, y: 161 })
			//.setDimensions({ width: 58, height: 161 })
			.setPosition({x: 430, y: 176 });
		
		var _this = this;

		engine.onTarget = function(event) {
			_this.mainActor.moveTo(event.detail, _this.walkbox);
		};

	}

	onEnter() {
		super.onEnter();
		this.mainActor.position = { x: 230, y: 180};
		this.mainActor.show();

		this.tower.show();

		this.text = new Text("Tech demo 6: Complex walkbox (should be convex so every point can be reached in a straight line)")
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

function demo6() {
	game.show(new DemoRoom6("tatooine"));
}
