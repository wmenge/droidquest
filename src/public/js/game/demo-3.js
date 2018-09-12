var game = {
	init: function() {

		tatooineRoom = new TatooineRoom("tatooine");

		tatooineRoom.walkbox = {
				a: { x: 0, y: 140},
				b: { x: 460, y: 240}
		};

		tatooineRoom.init();
		tatooineRoom.enter();
		
		requestAnimationFrame(mainLoop);
	}
}

class TatooineRoom extends Room {

	init() {	
		super.init();

		this.mainActor = new MovingActor('./resources/r2d2-sheet.png');
		this.mainActor.dimensions = { width: 36, height: 45 };
		this.mainActor.origin = { x: -36 / 2, y: -40 };
		
		this.secondActor = new MovingActor('./resources/r2d2-sheet.png');
		this.secondActor.dimensions = { width: 36, height: 45 };
		this.secondActor.origin = { x: -36 / 2, y: -40 };

		this.thirdActor = new MovingActor('./resources/r2d2-sheet.png');
		this.thirdActor.dimensions = { width: 36, height: 45 };
		this.thirdActor.origin = { x: -36 / 2, y: -40 };

		this.fourthActor = new MovingActor('./resources/r2d2-sheet.png');
		this.fourthActor.dimensions = { width: 36, height: 45 };
		this.fourthActor.origin = { x: -36 / 2, y: -40 };
		
		this.tower = new Prop('./resources/tower.png')
			.setOrigin({ x: -58 / 2, y: -161 })
			.setDimensions({ width: 58, height: 161 })
			.setPosition({x: 430, y: 176 });
	}

	enter() {

		super.enter();

		this.mainActor.position = { x: 80, y: 160};
		this.mainActor.show();

		this.secondActor.position = { x: 160, y: 160};
		this.secondActor.show();

		this.thirdActor.position = { x: 300, y: 160};
		this.thirdActor.show();

		this.fourthActor.position = { x: 300, y: 220};
		this.fourthActor.show();

		this.tower.show();

		/* 
			Scripting moves
			---------------

		    The functions of an actor that perform a function
	        that takes time (such as waiting or moving) return a promise
		    This allows the caller to wait (await keyword) to wait until
		    the action finishes. 

		    this allows for easy scriptable code such as:
		
		    await this.mainActor.wait(500);
		    await this.mainActor.moveTo({ x: 80, y: 160});
		    await this.mainActor.moveTo({ x: 80, y: 80});

		    TODO: Can also be written using .then() syntax, check this
		*/

		// Any code that wants to be able to wait on promises
		// must not run on the UI thread but must be started in 
		// a background process (async keyword)

		// move main actor
		(async function(actor) {
		
			while(true) {
				
				// syncrhonous script, each step is only executed
				// after the previous step has completely finished
			    await actor.moveRelative({ x: 0, y: 60});
			    await actor.wait(750);
			    await actor.moveRelative({ x: 0, y: -60});
			    await actor.wait(750);

			}

		})(this.mainActor);


		// move secondary actor
		(async function(actor) {
		
			while(true) {
				
				// syncrhonous script, each step is only executed
				// after the previous step has completely finished
			    await actor.moveRelative({ x: 80, y: 0});
			    await actor.wait(1000);
			    await actor.moveRelative({ x: -80, y: 0});
			    await actor.wait(1000);

			}

		})(this.secondActor);

		// move third and fourth actors syncronously
		(async function(actor1, actor2) {
		
			while(true) {
				
				// syncrhonous script, each step is only executed
				// after the previous step has completely finished
			    await actor1.moveRelative({ x: 60, y: 0});
			    await actor1.wait(250);
			    await actor2.moveRelative({ x: 60, y: 0});
			    await actor2.wait(250);
			    await actor1.moveRelative({ x: -60, y: 0});
			    await actor1.wait(250);
			    await actor2.moveRelative({ x: -60, y: 0});
			    await actor2.wait(250);

			}

		})(this.thirdActor, this.fourthActor);
	
	}

}

engine.init();
game.init();
