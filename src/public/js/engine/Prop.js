// Refactor Prop, MovingActor into Prop, Actor, Sprite, Spritesheet
class Prop { 

	constructor(imageUrl) {

		// refactor into sprite/spritesheet
		this.image = new Image();
		this.image.src = imageUrl;
		
		this.position = { x: 0, y: 0 };
		this.origin = { x: 0, y: 0 };
		this.dimensions = { width: 0, height: 0 };

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

	setDimensions(dimensions) {
		this.dimensions = dimensions;
		return this;
	}

	setZIndex(zIndex) {
		this.zIndex = zIndex;
		return this;
	}

	// Sprite/sheet
	draw(ctx) {

		ctx.save();

		ctx.translate(this.position.x, this.position.y);
		ctx.drawImage(this.image, this.origin.x, this.origin.y);

		ctx.restore();

	}

	// Prop
	get box() {
		return [ 
			{ 
				x: this.position.x + this.origin.x,
				y: this.position.y + this.origin.y
			},
			{ 
				x: this.position.x + this.origin.x + this.dimensions.width,
				y: this.position.y + this.origin.y + this.dimensions.height
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
		ctx.strokeRect(this.position.x + this.origin.x, this.position.y + this.origin.y, this.dimensions.width, this.dimensions.height);

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