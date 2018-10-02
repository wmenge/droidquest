class SpaceRoom extends Room {

	enter() {
		
		super.enter();

		this.text = new Text("Je bent ontsnapt!")
			.setPosition({ x: 170, y: 80 })
			.show('fadeIn');

		this.footer = new Text('Use the <a href="https://github.com/wmenge/droidquest" target="_blank">source</a> Luke!<br><br><a href="demo-001.html">Click for Tech demos</a>')
			.setPosition({ x: 10, y: 220 })
			.addClassName('center')
			.addClassName('small')
			.show('fadeIn');

		var _this = this;

		this.button = new Button("Nog een keer!")
			.setPosition({ x: 175, y: 160 })
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