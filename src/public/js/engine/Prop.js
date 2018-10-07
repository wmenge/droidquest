// Refactor Prop, Actor into Prop, Actor, Sprite, Spritesheet
class Prop { 

	constructor(sprite) {

		var _this = this;

		if (sprite instanceof Sprite) {
			this.sprite = sprite;
		} else {
			_this = this;
			this.spritePromise = getSprite(sprite).then(function(spriteObj) {
				_this.sprite = spriteObj;
			});
		}

		this.position = { x: 0, y: 0 };
		this.origin = { x: 0, y: 0 };
		
		// Actor/prop
		this.zIndex = 0;

		// call back function
		this.onTarget = null;
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

	// Sprite/sheet (remove from prop and handle in engine?)
	// should engine.dwarables be only filled with sprites?
	draw(ctx, timestamp, scaleFactor) {

		this.sprite.draw(ctx, (this.position.x + this.origin.x) * scaleFactor.x, (this.position.y + this.origin.y) * scaleFactor.y, this.orientation, 0, scaleFactor);

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

		// Makes sure that lines and sprites align nicely to the middle of pixels
		// (otherwise lines become blurred between 2 lines/rows)
		//ctx.translate(.5, .5);

		var dimensions = this.sprite.getDimensions();

		// old position
		ctx.strokeRect(
			(this.position.x + this.origin.x) * scaleFactor.x, 
			(this.position.y + this.origin.y) * scaleFactor.y, 
			dimensions.width * scaleFactor.x, 
			dimensions.height * scaleFactor.y);

		//ctx.restore();
		
	}

	isShown() {
		var index = engine.drawables.indexOf(this);
		return (index > -1);
	}

	// Prop
	show() {
		// wait until sprite has been loaded
		if (this.sprite) {
			engine.drawables.push(this);
		//	engine.movables.push(this);
		} else {
			var _this = this;
			this.spritePromise.then(function(result) {
				_this.show();
			});
		}
	}

	// Prop
	hide() {
		var index = engine.drawables.indexOf(this);
		
		if (index > -1) {
  			engine.drawables.splice(index, 1);
		}
	}

}