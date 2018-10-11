var game5 = {
	init: function() {

		var demoRoom = new DemoRoom5("tatooine");
		demoRoom.init();
		demoRoom.enter();
		
		requestAnimationFrame(mainLoop);
	}
}

class DemoRoom5 extends Room {


	enter() {

		super.enter();

		new Text("Tech demo 5: Text and buttons that can be positioned on 'pixels'")
			.setPosition({ x: 10, y: 5 })
			.setDimensions({ width: 320, height: 25 })
			.addClassName('debug')
			.addClassName('outline')
			.show();

			new Prop()
				.setPosition({ x: 230, y: 120 })
				//.setDimensions({ width: 10, height: 10 })
				//.setOrigin({ x: -5, y: -5 })
				.show()

		for (var i = 0; i < 10; i++) {

			new Text("Hello!")
				.setPosition({ x: 60 + i * 30, y: 50 + i * 16 })
				.setDimensions({ width: 35, height: 12 })
				//.addClassName('debug')
				.addClassName('outline')
				.show();

			// Canvas drawn prop to 'calibrate' the position of html text elements
			new Prop()
				.setPosition({ x: 60 + i * 30, y: 50 + i * 16 })
				//.setDimensions({ width: 36, height: 12 })
				.show()
		}

		this.debugButton = new Button("toggle debugger")
			.setPosition({ x: 10, y: 220 })
			.addClassName('small')
			.addClassName('buttonOutline').onSelect(function() {
				engine.debugMode = !engine.debugMode;
			}).show();


	}

}

function demo5() {
	engine.init();
	game5.init();
}
