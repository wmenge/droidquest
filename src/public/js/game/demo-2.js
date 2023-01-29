class DemoRoom2 extends Room {

	init() {

		super.init();

		this.tower = new Prop('tower')
			.setOrigin({ x: 58 / 2, y: 161 })
			.setPosition({x: 430, y: 176 });

		// dummy actor so that its resources are loaded during
		// alternative: load texture directly or have actor method load
		this.dummyActor = new Actor('r2d2');
		this.dummyActor = new Actor('c3po');

	}
		
	onEnter() {

		this.tower.show();

		this.text = new Text("Tech demo 2: Army of droids, syncrhonized scripting. Use the buttons to add or remove droids!")
			.setPosition({ x: 10, y: 5 })
			.show();
	
		this.minusButton = new Button("-")
			.setPosition({ x: 10, y: 20 })
			.onSelect(removeActor)
			.show();

		this.addButton = new Button("+")
			.setPosition({ x: 29, y: 20 })
			.onSelect(addActor)
			.show();

		for (var i = 0; i < 5; i++) {
			addActor();
		}
	}

	onExit() {

		for (var i = 0; i < actors.length; i++) {
			actors[i].hide();
		}

		actors = [];

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

	actors.splice(0, 1);
}

function addActor() {

	var name = (actors.length % 2 == 0 ) ? 'r2d2' : 'c3po';
	var origin = (actors.length % 2 == 0 ) ? { x: 36 / 2, y: 40 } : { x: 44 / 2, y: 70 };

	var actor = new Actor(name)
			.setOrigin(origin)
			//.setScaleFactor(Math.random() * 1.5 + .5)
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

function demo2() {
	game.show(new DemoRoom2("tatooine"));
}