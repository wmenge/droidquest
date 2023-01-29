class SpaceRoom extends Room {

	onEnter() {
		
		super.onEnter();

		this.text = new Text("Je bent ontsnapt!")
			.setPosition({ x: 170, y: 80 })
			.setColor('#ffd700')
			.show('fadeIn');

		this.footer = new Text('Use the source Luke!')
			.setPosition({ x: 10, y: 220 })
			.setColor('#ffd700')
			//.addClassName('center')
			//.addClassName('small')
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

}