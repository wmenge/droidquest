class Room {

	constructor(className) {
		this.className = className;
	}

	init() {

	}
	
	enter() {
		engine.canvas.className = this.className;
	}

	exit() {
		engine.canvas.className = null;
	}

	transitionTo(newRoom) {
		this.exit();
		newRoom.enter();
	}

}