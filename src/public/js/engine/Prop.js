class Prop { 

	constructor(sprite) {

		var _this = this;

		if (sprite instanceof Sprite) {
			this.name = 'actor';
		} else {
			this.name = sprite;
			_this = this;
			this.spritePromise = getSprite(sprite).then(function(spriteObj) {
				_this.sprite = spriteObj;
			});
		}

		this.position = { x: 0, y: 0 };
		this.origin = { x: 0, y: 0 };
		
		this.zIndex = 0;

		// call back function
		this.onTarget = null;

		this.scaleFactor = 1;

		this.shown = false;

		console.debug('Create', this.name, 'at', this.position);
	}

	setName(name) {
		this.name = name;
	}

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
		this.scaleFactor = scaleFactor;
		return this;
	}

	draw(ctx, timestamp, engineScaleFactor) {

		// performance: prevent object creation
		var spriteScale = { x: engineScaleFactor.x * this.scaleFactor, y: engineScaleFactor.y * this.scaleFactor };

		this.sprite.draw(ctx, (this.position.x + this.origin.x * this.scaleFactor) * engineScaleFactor.x, (this.position.y + this.origin.y * this.scaleFactor) * engineScaleFactor.y, this.tag, timestamp, spriteScale);

	}

	// Prop
	get box() {

		var dimensions = this.sprite.getDimensions();

		return [ 
			{ 
				x: this.position.x + this.origin.x,
				y: this.position.y + this.origin.y
			},
			{ 
				x: this.position.x + this.origin.x + dimensions.width,
				y: this.position.y + this.origin.y + dimensions.height
			}

		]
	}

	isInBox(point) {

		var box = this.box;

		return (point.x >= box[0].x && 
		        point.x <= box[1].x &&
		        point.y >= box[0].y && 
		        point.y <= box[1].y);

	}

	debug(ctx, scaleFactor) {

		var dimensions = this.sprite.getDimensions();

		ctx.strokeRect(
			(this.position.x + this.origin.x) * scaleFactor.x, 
			(this.position.y + this.origin.y) * scaleFactor.y, 
			dimensions.width * scaleFactor.x, 
			dimensions.height * scaleFactor.y);

	}

	isShown() {
		return this.shown = true;
	}


	show() {
		var _this = this;
		this.spritePromise.then(function(result) {
			engine.drawables.push(_this);
		});

		this.shown = true;

		console.debug('Show', this.name, 'at', this.position);

		return this;
	}

	hide() {
		var index = engine.drawables.indexOf(this);
		
		if (index > -1) {
  			engine.drawables.splice(index, 1);
		}

		console.debug('hide', this.name);
	}

}