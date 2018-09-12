class CorridorRoom extends Room {
	
	init() {
		super.init();

		this.walkbox = new Walkbox([ { x: 0, y: 128 }, { x: 460, y: 128 }, { x: 460, y: 220 }, { x: 0, y: 220 } ])
		this.walkbox.activate();

		this.mainActor = new MovingActor('./resources/r2d2-sheet.png');
		this.mainActor.dimensions = { width: 36, height: 45 };
		this.mainActor.origin = { x: -36 / 2, y: -40 };

		this.plans = new Prop('./resources/plans.png')
			.dimensions({ width: 18, height: 18 })
			.position({x: 360, y: 180 })

		game.obtainedPlans = false;

		this.door = new MovingActor('./resources/door.png', false);
		this.door.dimensions = { width: 49, height: 79 };
		this.door.velocity = 20;
		this.door.position = {x: 232, y: 41 };

		this.doorPanel = new Prop('./resources/door-hide-panel.png')
			.dimensions({ width: 56, height: 79 })
			.position({x: 183, y: 41 })

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

		this.mainActor.position = { x: -50, y: 160 };
		this.mainActor.show();

		// needed to stand for current object in anonymous functions
		// and event handlers
		var _this = this;

		(async function(_this) {

			// Move actor into place, then give player control of character
			await _this.mainActor.moveRelative({ x: 100, y: 0 });

			engine.enableInput = true;
		    
		    engine.onTarget = function(event) {

		    	//game.tatooineRoom.mainActor.moveTo(event.detail, _this.walkbox);

		    	_this.mainActor.moveTo(event.detail, _this.walkbox);	

		    	// Check if the new target is within the walkbox
		    	/*if (_this.walkbox.contains(event.detail)) {
		    		_this.mainActor.moveTo(event.detail);	
		    	} else {
		    		// Correct the target so that it lies on the edge of the walkbox
		    		var target = _this.walkbox.correctedTarget(_this.mainActor.position, event.detail);
		    		_this.mainActor.moveTo(target);
		    	}*/

		    };

		})(this);

		this.plans.onTarget = async function(event) {

			// Move actor to plans
			await _this.mainActor.moveTo(_this.plans._position);
			
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