class SpaceRoom extends Room {

	enter() {
		
		super.enter();

		// TEMP: needed to allow clicks to pass through to canvas
		var overlayContainer = document.getElementById('overlayContainer2');
		if (overlayContainer) overlayContainer.classList.remove('hidden');

		this.text = new Text("Je bent ontsnapt!")
			.position({ x: 170, y: 40 })
			.show('fadeIn');

		this.footer = new Text('Use the <a href="https://github.com/wmenge/droidquest">source</a> Luke!')
			.position({ x: 10, y: 110 })
			.dimensions({ width: 440, height: 1 })
			.className('center')
			.className('small')
			.show('fadeIn');

		var _this = this;

		this.button = new Button("Nog een keer!")
			.position({ x: 175, y: 60 })
			.onSelect(function() {
				// Navigate to next room
				var room = new IntroRoom("space");
				// TODO: put init in constructor? test inheritance behaviour
				room.init();
				_this.transitionTo(room);

			})
			.show('fadeIn');

	}

	exit() {

		this.text.hide();
		this.button.hide();
		this.footer.hide();

	}

}