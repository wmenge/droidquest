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

		this.mainActor = new Actor('r2d2')
			.setOrigin({ x: -36 / 2, y: -40 });
		
		this.tower = new Prop('tower')
			.setOrigin({ x: -58 / 2, y: -161 })
			.setPosition({x: 430, y: 176 });
	}

	enter() {

		super.enter();

		this.mainActor.position = { x: 190, y: 160};
		this.mainActor.speed = 90;
		this.mainActor.show();

		this.tower.show();

		this.text = new Text("Tech demo 1: Nervous drone pacing back and forth<br />Demonstrates synchronous (blocking) scripting")
			.setPosition({ x: 10, y: 5 })
			.addClassName('small')
			.addClassName('outline')
			.show();

		this.debugButton = new Button("toggle debugger")
			.setPosition({ x: 10, y: 220 })
			.addClassName('small')
			.addClassName('buttonOutline').onSelect(function() {
				engine.debugMode = !engine.debugMode;
			}).show();

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

			    await actor.moveRelative({ x: 120, y: 0});
			    await actor.wait(250);

			    /*await actor.moveRelative({ x: 0, y: 60});
			    await actor.wait(750);

			    await actor.moveRelative({ x: -300, y: 0});
			    await actor.wait(750);*/

			    await actor.moveRelative({ x: -120, y: 0});
			    await actor.wait(250);



			}

		})(this.mainActor);

	}

}

engine.init();
game.init();
