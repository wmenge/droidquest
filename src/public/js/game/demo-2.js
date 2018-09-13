var game = {
	init: function() {

		tatooineRoom = new TatooineRoom("tatooine");

		tatooineRoom.walkbox = {
				a: { x: 0, y: 0},
				b: { x: 460, y: 240}
		};

		tatooineRoom.init();
		tatooineRoom.enter();
		
		requestAnimationFrame(mainLoop);
	}
}

class TatooineRoom extends Room {

	enter() {

		super.enter();

		engine.debugMode = true;

		this.tower = new Prop('./resources/tower.png')
			.setOrigin({ x: -58 / 2, y: -161 })
			.setDimensions({ width: 58, height: 161 })
			.setPosition({x: 430, y: 176 });

		this.tower.show();

		this.text = new Text("Tech demo 2: Army of droids, syncrhonized scripting")
			.setPosition({ x: 10, y: 5 })
			.addClassName('small')
			.addClassName('outline')
			.show();

		/* 
			Scripting moves
			---------------

		    The functions of an actor that perform a function
	        that takes time (such as waiting or moving) return a promise
		    This allows the caller to wait (await keyword) to wait until
		    the action finishes. 

		    this allows for easy scriptable code such as:
		
		    await this.mainActor.moveTo({ x: 80, y: 160});
		   	await this.mainActor.wait(500);
		    await this.mainActor.moveTo({ x: 80, y: 80});

		    TODO: Can also be written using .then() syntax, check this
		*/

		//this.actors = [];

		// Probably not the most efficient way to move lots of actors, but it
		// drives home the point of controlling synchronisity:
		// x 'threads' running simultaneously, each controlling an actor
		// in a synchronous manner: 

		// Any code that wants to be able to wait on promises
		// must not run on the UI thread but must be started in 
		// a background process (async keyword)	
		var moveRandomly = async function(actor) {
			while (true) {
				await actor.moveTo(getRandomCoordinates());
			}
		}

		// Create some actores moving randomly
		for (var i = 0; i < 10; i++) {

			var actor = new MovingActor('./resources/r2d2-sheet.png');
			actor.dimensions = { width: 36, height: 45 };
			actor.origin = { x: -36 / 2, y: -40 };
			actor.position = getRandomCoordinates();
			actor.show();

			moveRandomly(actor);
		}
	}

}

function getRandomCoordinates() {
	return { 
		x: Math.floor(Math.random() * tatooineRoom.walkbox.b.x),
		y: Math.floor(Math.random() * tatooineRoom.walkbox.b.y)
	};
}

engine.init();
game.init();