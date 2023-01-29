class Prop { 

	constructor(spriteName) {

		var _this = this;

		this.name = spriteName;

    	this.loadResource();

    	// remove, as coordinates are already stored in sprite?
		this.position = { x: 0, y: 0 };
		this.origin = { x: 0, y: 0 };
		
		this.zIndex = 0;

		// call back function
		this.onTarget = null;

		this.scaleFactor = 1;

		this.shown = false;

		console.debug('Create', this.name);
	}

	// Load resourdes with loader. Loader is called when the parent room is being entered
    // Assume these are loaded when the show() method is called
    loadResource() {
		if (!PIXI.loader.resources["resources/sprites/" + this.name + ".png"]) {
	    	PIXI.loader.add("resources/sprites/" + this.name + ".png");
    	}
	}

	setName(name) {
		this.name = name;
	}

	// check if there is some magic to allow these setters to be called
	// when doing something.position = somePosition
	setPosition(position) {
		this.position = position;
		return this;
	}

	setOrigin(origin) {
		this.origin = origin;
		return this;
	}

	setZIndex(zIndex) {
		this.zIndex = zIndex;
		return this;
	}

	setScaleFactor(scaleFactor) {
		this.sprite.scale.x = scaleFactor;
    	this.sprite.scale.y = scaleFactor;
		//this.scaleFactor = scaleFactor;
		return this;
	}

	isInBox(point) {

		return this.sprite.containsPoint(point);
	}


	debug() {

		this.debugGraphics = new PIXI.Graphics();

		app.stage.addChild(this.debugGraphics);

		this.debugGraphics.lineStyle(1, 0xff0000);

		// draw rect
		// TODO: Bug: when called from from Prop.show() this.sprite doesn't 
		// have the correct dimensions
		this.debugGraphics.drawRect(0, 0, this.sprite.width, this.sprite.height);

		// draw origin
		/*this.debugGraphics.lineStyle(1, 0x00ff00);

		let cx = this.origin.x;
		let cy = this.origin.y;
		let length = 4;

		this.debugGraphics.moveTo(cx, cy - length);
		this.debugGraphics.lineTo(cx, cy + length + 1);
		this.debugGraphics.moveTo(cx - length - 1, cy);
		this.debugGraphics.lineTo(cx + length, cy);
		
		this.debugGraphics.position.set(
			this.position.x - this.origin.x,
			this.position.y - this.origin.y)*/

	}

	debugOff() {
		app.stage.removeChild(this.debugGraphics);
		this.debugGraphics == null;
	}

	/*debug(ctx, scaleFactor) {

		var dimensions = this.sprite.getDimensions();

		ctx.strokeRect(
			(this.position.x + this.origin.x) * scaleFactor.x, 
			(this.position.y + this.origin.y) * scaleFactor.y, 
			dimensions.width * scaleFactor.x, 
			dimensions.height * scaleFactor.y);

	}*/

	isShown() {
		return this.shown = true;
	}


	show() {
		/*var _this = this;
		this.spritePromise.then(function(result) {
			engine.drawables.push(_this);
		});*/

	
		//this.sprite = new PIXI.Sprite(PIXI.utils.TextureCache["resources/sprites/" + this.name + ".png"]);

		this.sprite = new PIXI.Sprite(PIXI.loader.resources["resources/sprites/" + this.name + ".png"].texture.clone());
  
  		var _this = this;

  		// add click event
  		// TODO: Determine when to do this
  		this.sprite.interactive = true;

		this.sprite.click = function(event) {

			_this.sprite.interactive = false;

			///event.data.originalEvent.preventDefault();
			event.stopPropagation()

			if (_this.onTarget) _this.onTarget(event);
		}

		this.sprite.position.set(
			this.position.x - this.origin.x,
			this.position.y - this.origin.y)

		this.sprite.zIndex = this.position.y;
		
		app.stage.addChild(this.sprite);
		this.sprite.parentGroup = spriteGroup;

		this.shown = true;

		engine.addDebugable(this);

		console.debug('Show', this.name, 'at', this.position);

		return this;
	}

	hide() {
		
		engine.removeDebugable(this);

		app.stage.removeChild(this.sprite);

		console.debug('hide', this.name);
	}

}