class SpaceRoom extends Room {

	enter() {
		
		super.enter();

		this.text = new Text("Je bent ontsnapt!")
			.setPosition({ x: 170, y: 40 })
			.show('fadeIn');

		this.footer = new Text('Use the <a href="https://github.com/wmenge/droidquest" target="_blank">source</a> Luke!')
			.setPosition({ x: 10, y: 110 })
			.setDimensions({ width: 440, height: 1 })
			.addClassName('center')
			.addClassName('small')
			.show('fadeIn');

		var _this = this;

		this.button = new Button("Nog een keer!")
			.setPosition({ x: 175, y: 60 })
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