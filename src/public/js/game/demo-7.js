var game7 = {
	init: function() {

		room = new DemoRoom7("tatooine");

		room.walkbox = {
				a: { x: 0, y: 140},
				b: { x: 460, y: 240}
		};

		room.init();
		room.enter();
		
		requestAnimationFrame(mainLoop);
	}
}

class DemoRoom7 extends Room {

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
		this.mainActor.setTalkingSpeed(10)
		this.mainActor.show();

		this.tower.show();

		this.text = new Text("Tech demo 7: A talking droid")
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

				//actor.velocity = 1000;

				await actor.talk('Oooh boy, i’m worried...', 'Front');
			    
			    await actor.moveRelative({ x: 60, y: 0});
			   	//await actor.setPosition({ x: 190 + 120, y: 160 + 50});
			    
			   	//await actor.talk('Oooh boy, i\'m worried...', 'Front');
			    //await actor.talk('Ik maak me zorgen...', 'Front');

			   	await actor.talk('What could have happened?', 'Front');


			    await actor.moveRelative({ x: -60, y: 0});
			    //await actor.setPosition({ x: 190, y: 160});
			    


			    //await actor.talk('Waar is mijn vriendje?', 'Front');

				await actor.moveTo({ x: 10, y: 220});
				//await actor.moveTo({ x: 10, y: 220});
				
			    await actor.talk('Now I stand at the left', 'Front');

			    await actor.moveTo({ x: 440, y: 220});
			    //await actor.moveTo({ x: 440, y: 220});
			    
			    await actor.talk('Now at the right', 'Front');

			    await actor.moveTo({ x: 190, y: 160});
			    //await actor.moveTo({ x: 190, y: 160});
			    

			    await actor.talk('And now I will say a very long line, just because I feel like it. And don\'t you dare to interupt me.', 'Front');
/**/

			}

		})(this.mainActor);

	}

}

function demo7() {
	engine.init();
	game7.init();
}
