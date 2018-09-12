class IntroRoom extends Room {

	init() {	
		super.init();

		// chaining method syntax!
		this.logo = new MovingActor('./resources/logo.png', false)
			.setOrigin({ x: -(135 + 1) / 2, y: -64 })
			.setDimensions({ width: 135, height: 64 });
		
		this.imagePanel = new MovingActor('./resources/intro.png', false)
			.setOrigin({ x: -129, y: -180 / 2 })
			.setDimensions({ width: 129, height: 190 });
		
		var _this = this;

		this.footer = new Text('A classic point and click adventure by <a href="https://twitter.com/wmenge" target="_blank">@wmenge</a>')
			.setPosition({ x: 10, y: 110 })
			.setDimensions({ width: 440, height: 1 })
			.addClassName('center')
			.addClassName('small');
			
		this.startButton = new Button("Start!")
			.setPosition({ x: 200, y: 80 });

		this.startButton.onSelect(function() {

			// hide logo and button
			_this.logo.hide();
			_this.startButton.hide();
			_this.footer.hide();
			
			_this.imagePanel.moveRelative({ x: -140, y: 0});

			_this.heading = new Text("Help Prinses Leia!")
				.setPosition({ x: 30, y: 20 })
				.setType('h1')
				.show('fadeIn');

			_this.text = new Text("De prinses heeft geheime plannen voor de rebellen! Vind de plannen en ontsnap uit het ruimteschip!")
				.setPosition({ x: 30, y: 40 })
				.setDimensions({ width: 250, height: 30 })
				.show('fadeIn');

			_this.okButton = new Button("OK!")
				.setPosition({ x: 110, y: 80 });

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
		this.logo.setPosition({ x: (460 / 2) , y: 0 - 64 });
		this.logo.show();

		this.imagePanel.setPosition({ x: 460 + 130, y: 120 });
		this.imagePanel.show();

		this.intro = new Text("A long time ago<br />in a galaxy far, far away...")
			.setPosition({ x: 140, y: 50 })
			.addClassName('blue')
			.show('fadeIn');

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

	exit() {

		super.exit();

		// auto hide all objects!
		this.imagePanel.hide();
		this.heading.hide();
		this.text.hide();
		this.okButton.hide();
		this.intro.hide();
		//this.footer.hide();

		// TEMP: needed to allow clicks to pass through to canvas
		var overlayContainer = document.getElementById('overlayContainer2');
		if (overlayContainer) overlayContainer.classList.add('hidden');


		
	}

}