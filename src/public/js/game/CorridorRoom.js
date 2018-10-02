class CorridorRoom extends Room {
	
	init() {
		super.init();

		this.walkbox = new Walkbox([ { x: 0, y: 128 }, { x: 460, y: 128 }, { x: 460, y: 220 }, { x: 0, y: 220 } ])
		this.walkbox.activate();

		this.mainActor = new Actor('r2d2')
			.setOrigin({ x: -36 / 2, y: -40 });

		this.plans = new Prop('plans')
			.setPosition({x: 360, y: 180 })

		game.obtainedPlans = false;

		this.door = new Actor('door')
			.setVelocity(20)
			.setPosition({x: 232, y: 41 });

		this.doorPanel = new Prop('door-hide-panel')
			.setPosition({x: 183, y: 41 })

		this.door.open = function() {
			return this.moveRelative({ x: -49, y: 0});
		}

		this.door.close = function() {
			return this.moveRelative({ x: 49, y: 0});
		}
	}

	enter() {

		super.enter();

		this.plans.show();
		this.door.show();
		this.doorPanel.show();

		this.mainActor.setPosition({ x: -50, y: 160 });
		this.mainActor.show();

		// needed to stand for current object in anonymous functions
		// and event handlers
		var _this = this;

		(async function(_this) {

			// Move actor into place, then give player control of character
			await _this.mainActor.moveRelative({ x: 100, y: 0 });

			engine.enableInput = true;
		    
		    engine.onTarget = function(event) {
		    	_this.mainActor.moveTo(event.detail, _this.walkbox);
		    };

		})(this);

		this.plans.onTarget = async function(event) {

			// Move actor to plans
			await _this.mainActor.moveTo(_this.plans.position);
			
			// "pick up" plans
			_this.plans.hide();
		
			// change game global state: Plans have been secured
			game.obtainedPlans = true;
		};

		// Open door
		this.door.onTarget = async function(event) {

			// If plans are obtained, escape to space!
			if (!game.obtainedPlans) return;

			// droid to door
			await _this.mainActor.moveTo({ x: 256, y: 130});

			engine.enableInput = false;
			
			// open door
			await _this.door.open()
			
			// droid enters door
			await _this.mainActor.moveRelative({ x: 0, y: -20});
			
			// close door over droid
			_this.mainActor.zIndex = -1;
			await _this.door.close();

			// provide game or engine with a pause method
			await _this.door.wait(1500);

			var spaceRoom = new SpaceRoom("space");
			spaceRoom.init();
			_this.transitionTo(spaceRoom);
			
		};

	}

	exit() {
		// todo: auto hide all children
		this.walkbox.deactivate();
		this.plans.hide();
		this.door.hide();
		this.doorPanel.hide();
		this.mainActor.hide();
	}

}