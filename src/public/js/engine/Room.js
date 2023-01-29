class Room {

	constructor(name) {
		this.name = name;

    	if (!PIXI.loader.resources["resources/rooms/" + name + ".png"]) {
	    	PIXI.loader.add("resources/rooms/" + name + ".png");
    	}    	
	}

	init() {
		console.info('Init', this.name);
	}
	
	enter() {
		console.info('Entering', this.name);

		// load al resources that have been requested so far
		PIXI.loader.on("progress", function(loader, resource) {
	    	console.log("PIXI Resource loading:", resource.url, "(" + Math.round(loader.progress) + "%)"); 
    	});

    	var _this = this;

		PIXI.loader.load(function() {
			console.log('loaded');
			
			_this.sprite = new PIXI.TilingSprite(PIXI.loader.resources["resources/rooms/" + _this.name + ".png"].texture, 460, 224);
  	
  			app.stage.addChild(_this.sprite);

  			_this.sprite.parentGroup = backgroundGroup;
	
			_this.onEnter();
		})

	}

	onEnter() {}

	exit() {
		console.info('Exit', this.name);

		// hide all showable members
		for (var property in this) {
			if (typeof this[property].hide === 'function') {
				this[property].hide();
				//app.stage.removeChild(property);
			}
		}

		this.onExit();

		app.stage.removeChild(this.sprite);
	}

	onExit() {}

	transitionTo(newRoom) {
		console.info('Transition from', this.name, 'to', newRoom.name);
		this.exit();
		newRoom.enter();
	}

}