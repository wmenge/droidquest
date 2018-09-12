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
		
		this.tower = new Prop('./resources/tower.png');
		this.tower.origin = { x: -58 / 2, y: -161 };
		this.tower.position = {x: 430, y: 176 };
	}

	enter() {

		super.enter();

		this.mainActor.position = { x: 80, y: 160};
		this.mainActor.show();

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

	}

}

engine.init();
game.init();
