class DemoRoom3 extends Room {

	init() {	
		super.init();

		this.mainActor = new Actor('r2d2')
			//.setScaleFactor(2)
			.setOrigin({ x: 36 / 2, y: 40 });
		
		this.secondActor = new Actor('c3po')
			.setOrigin({ x: 44 / 2, y: 70 });

		this.thirdActor = new Actor('r2d2')
			.setOrigin({ x: 36 / 2, y: 40 });

		this.fourthActor = new Actor('c3po')
			.setOrigin({ x: 44 / 2, y: 70 });
		
		this.tower = new Prop('tower')
			.setOrigin({ x: 58 / 2, y: 161 })
			.setPosition({x: 430, y: 176 });
	}

	onEnter() {

		super.onEnter();

		this.mainActor.setPosition({ x: 80, y: 160});
		this.mainActor.show();

		this.secondActor.setPosition({ x: 160, y: 160});
		this.secondActor.show();

		this.thirdActor.setPosition({ x: 300, y: 160});
		this.thirdActor.show();

		this.fourthActor.setPosition({ x: 300, y: 220});
		this.fourthActor.show();

		this.tower.show();

		this.text = new Text("Tech demo 3: Multiple droids, each with their own 'thread' with synchronized (blocking) scripting")
			.setPosition({ x: 10, y: 5 })
			//.addClassName('small')
			//.addClassName('outline')
			.show();

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
			    await actor.moveRelative({ x: 0, y: 60});
			    await actor.wait(1000);
			    await actor.moveRelative({ x: -80, y: 0});			    
			    await actor.wait(1000);
			    await actor.moveRelative({ x: 0, y: -60});			    
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

function demo3() {
	game.show(new DemoRoom3("tatooine"));
}