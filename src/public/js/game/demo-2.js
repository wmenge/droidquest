var game = {
	init: function() {

		var room = new DemoRoom("tatooine");
		room.init();
		room.enter();
		
		requestAnimationFrame(mainLoop);
	}
}

class DemoRoom extends Room {

	enter() {

		super.enter();

		this.text = new Text("Tech demo 2: Army of droids, syncrhonized scripting. Use the buttons to add or remove droids!")
			.setPosition({ x: 10, y: 5 })
			.addClassName('small')
			.addClassName('outline')
			.show();

		this.removeButton = new Button("-")
			.setPosition({ x: 10, y: 20 })
			.addClassName('small')
			.addClassName('buttonOutline');
		
		this.removeButton.selectHandler = removeActor;
		this.removeButton.show();

		this.addButton = new Button("+")
			.setPosition({ x: 29, y: 20 })
			.addClassName('small')
			.addClassName('buttonOutline');

		this.addButton.selectHandler = addActor;
		this.addButton.show();

		this.debugButton = new Button("toggle debugger")
			.setPosition({ x: 10, y: 220 })
			.addClassName('small')
			.addClassName('buttonOutline').onSelect(function() {
				engine.debugMode = !engine.debugMode;
			}).show();
		
		this.tower = new Prop('tower')
			.setOrigin({ x: -58 / 2, y: -161 })
			.setPosition({x: 430, y: 176 });

		this.tower.show();

		for (var i = 0; i < 10; i++) {
			addActor();
		}
	}

}

var actors = [];

async function moveRandomly (actor) {
	while (actor.isShown()) {
		await actor.moveTo(getRandomCoordinates());
	}
}

function removeActor() {

	if (actors.length == 0) return;

	var actor = actors[0];

	actor.hide();

	engine.drawables.splice(0, 1);
}

function addActor() {

	var name = (actors.length % 2 == 0 ) ? 'r2d2' : 'c3po';
	var origin = (actors.length % 2 == 0 ) ? { x: -36 / 2, y: -40 } : { x: -44 / 2, y: -70 };

	var actor = new MovingActor(name)
			.setOrigin(origin)
			.setPosition(getRandomCoordinates())
			.show();

	actors.push(actor);

	moveRandomly(actor);

}

function getRandomCoordinates() {
	return { 
		x: Math.floor(Math.random() * 460),
		y: Math.floor(Math.random() * 240)
	};
}

engine.init();
game.init();