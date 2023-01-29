var game = {

	obtainedPlans: false,

	init: function() {

		var introRoom = new IntroRoom("space");
		introRoom.init();
		introRoom.enter();
	
		/*var corridorRoom = new CorridorRoom("corridor");
		corridorRoom.init();
		corridorRoom.enter();*/

		// move to engine init?
		//requestAnimationFrame(mainLoop);
	}
}



//PIXI.loader.load(function() {
	engine.init();
	game.init();
//});
