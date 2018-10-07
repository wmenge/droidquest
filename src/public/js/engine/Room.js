class Room {

	constructor(className) {
		this.className = className;
	}

	init() {
		console.info('Init', this.className);
	}
	
	enter() {
		console.info('Entering', this.className);
		engine.canvas.className = this.className;
	}

	exit() {
		console.info('Exit', this.className);
		engine.canvas.className = null;
	}

	transitionTo(newRoom) {
		console.info('Transition from', this.className, 'to', newRoom.className);
		this.exit();
		newRoom.enter();
	}

}