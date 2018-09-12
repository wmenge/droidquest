var game = {

	obtainedPlans: false,

	init: function() {

		var introRoom = new IntroRoom("space");
		introRoom.init();
		introRoom.enter();
	
		/*var overlayContainer = document.getElementById('overlayContainer2');
		if (overlayContainer) overlayContainer.classList.add('hidden');

		var corridorRoom = new CorridorRoom("corridor");
		corridorRoom.init();
		corridorRoom.enter();*/

		// move to engine init?
		requestAnimationFrame(mainLoop);
	}
}

engine.init();
game.init();