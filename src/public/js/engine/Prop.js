// Refactor Prop, MovingActor into Prop, Actor, Sprite, Spritesheet
class Prop { 
	constructor(imageUrl) {

		// refactor into sprite/spritesheet
		this._image = new Image();
		this._image.src = imageUrl;
		
		this._position = { x: 0, y: 0 };
		this._origin = { x: 0, y: 0 };
		this._dimensions = { width: 0, height: 0 };

		// Actor/prop
		this.zIndex = 0;
	
		// call back function
		this.onTarget = null;
	}

	position(position) {
		this._position = position;
		return this;
	}

	origin(origin) {
		this._origin = origin;
		return this;
	}

	dimensions(dimensions) {
		this._dimensions = dimensions;
		return this;
	}

	zIndex(zIndex) {
		this.zIndex = zIndex;
		return this;
	}

	// Sprite/sheet
	draw(ctx) {

		ctx.save();

		ctx.translate(this._position.x, this._position.y);
		ctx.drawImage(this._image, this._origin.x, this._origin.y);

		ctx.restore();

	}

	// Prop
	get box() {
		return [ 
			{ 
				x: this._position.x + this._origin.x,
				y: this._position.y + this._origin.y
			},
			{ 
				x: this._position.x + this._origin.x + this._dimensions.width,
				y: this._position.y + this._origin.y + this._dimensions.height
			}

		]
	}

	// Prop
	isInBox(point) {

		var box = this.box;

		return (point.x >= box[0].x && 
		        point.x <= box[1].x &&
		        point.y >= box[0].y && 
		        point.y <= box[1].y);

	}

	// Sprite
	debug(ctx) {

		ctx.save();

		// Makes sure that lines and sprites align nicely to the middle of pixels
		// (otherwise lines become blurred between 2 lines/rows)
		ctx.translate(.5, .5);

		// old position
		ctx.strokeRect(this._position.x + this._origin.x, this._position.y + this._origin.y, this._dimensions.width, this._dimensions.height);

		ctx.restore();
		
	}

	// Prop
	show() {
		engine.drawables.push(this);
	}

	// Prop
	hide() {
		var index = engine.drawables.indexOf(this);
		
		if (index > -1) {
  			engine.drawables.splice(index, 1);
		}
	}

}