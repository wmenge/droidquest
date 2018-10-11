class IntroRoom extends Room {

	init() {	
		super.init();

		this.intro = new Text("A long time ago<br />in a galaxy far, far away...")
			.setPosition({ x: 140, y: 100 })
			.addClassName('blue');

		this.logo = new Actor('logo')
			.setOrigin({ x: -(135 + 1) / 2, y: -64 });
			
		this.imagePanel = new Actor('intro', false)
			.setOrigin({ x: -129, y: -180 / 2 });
			
		var _this = this;

		this.startButton = new Button("Start!")
			.setPosition({ x: 200, y: 160 });

		this.footer = new Text('A classic point and click adventure by <a href="https://twitter.com/wmenge" target="_blank">@wmenge</a><br><br><a href="demo.html">Click for Tech demos</a>')
			.setPosition({ x: 10, y: 220 })
			.addClassName('center')
			.addClassName('small');
			
		this.startButton.onSelect(function() {

			// hide logo and button
			_this.logo.hide();
			_this.startButton.hide();
			_this.footer.hide();
			
			_this.imagePanel.moveRelative({ x: -140, y: 0});

			_this.heading = new Text("Help Prinses Leia!")
				.setPosition({ x: 30, y: 40 })
				.setType('h1')
				.show('fadeIn');

			_this.text = new Text("De prinses heeft geheime plannen voor de rebellen! Vind de plannen en ontsnap uit het ruimteschip!")
				.setPosition({ x: 30, y: 80 })
				.setDimensions({ width: 250, height: 30 })
				.show('fadeIn');

			_this.okButton = new Button("OK!")
				.setPosition({ x: 110, y: 160 });

			_this.okButton.onSelect(function() {

				// Navigate to next room
				var corridorRoom = new CorridorRoom("corridor");
				// TODO: put init in constructor? test inheritance behaviour
				corridorRoom.init();
				_this.transitionTo(corridorRoom);

			})
			.show('fadeIn');

			});
	}

	enter() {

		super.enter();

		// initial positions of logo and image panel (outside of view)
		this.logo.setPosition({ x: (460 / 2) , y: -64 });
		this.logo.show();

		this.imagePanel.setPosition({ x: 460 + 130, y: 120 });
		this.imagePanel.show();

		this.intro.show('fadeIn');

		var _this = this;

		// Todo: Add wait method to texts
		setTimeout(function() {
			_this.intro.hide('fadeOut');

			(async function(_this) {
			
				// move logo into view
				await _this.logo.moveRelative({ x: 0, y: 200});

				_this.startButton.show();
				_this.footer.show();
				
			})(_this);

		}, 5000)
 
	}

}