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

		// hide all showable members
		for (var property in this) {
			if (typeof this[property].hide === 'function') {
				this[property].hide();
			}
		}

		engine.canvas.className = null;
	}

	transitionTo(newRoom) {
		console.info('Transition from', this.className, 'to', newRoom.className);
		this.exit();
		newRoom.enter();
	}

}