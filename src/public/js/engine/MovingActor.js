class MovingActor extends mix(Object).with(EventDispatcher) {

	constructor(imageUrl, isSpriteSheet = true) {

		super();

		// refactor out into sprite/spritesheet classes
		this.image = new Image();
		this.image.src = imageUrl;
		this.isSpriteSheet = isSpriteSheet;
		
		this.dimensions = { width: 0, height: 0 };
		
		this.position = { x: 0, y: 0 };
		this.origin = { x: 0, y: 0 };
		
		this.target = null;
		this.velocity = 60; // pixels per second
		this.orientation = 0;

		// Actor/prop
		this.zIndex = 0;
		//this.callbacks = [];

	}

	// Actor
	show() {
		engine.drawables.push(this);
		engine.movables.push(this);
	}

	// Actor
	hide() {

		var index = engine.drawables.indexOf(this);
		
		if (index > -1) {
  			engine.drawables.splice(index, 1);
		}

		index = engine.movables.indexOf(this);
		
		if (index > -1) {
  			engine.movables.splice(index, 1);
		}
	}
	
	// Actor
	wait(timeout) {

	  let promise = new Promise((resolve, reject) => {
	    setTimeout(() => resolve(), timeout)
	  });

	  return promise;
	}

	// Actor
	moveRelative(relativeTarget) {
		return this.moveTo(
			{ x: this.position.x + relativeTarget.x, 
			  y: this.position.y + relativeTarget.y
			});
	}

	// Actor
	moveTo(newTarget, walkbox) {

		// If no obbject is currently moving, the engine isn't requesting frames,
		// therefore request one to be sure
		//requestAnimationFrame(mainLoop);

		// shallow copy by value
		this.oldPosition = { x: this.position.x , y: this.position.y };

    	// Check if the new target is within the walkbox
    	if (walkbox && !walkbox.contains(newTarget)) {
    		// Correct the target so that it lies on the edge of the walkbox
    		newTarget = walkbox.correctedTarget(this.position, newTarget);
    	}

    	console.log('MovingActor.moveTo: ', newTarget);

		this.target = newTarget;

		/*

	       start position

		   |\
		   | \  c
	 	 a |  \
		   |___\ target position

		     b

		 a^2 + b^2 = c^2

		 (Virtual) velocity c is constant and is built up of actual velocities a and b
		 those velocities should be calculated 

		 velocity c = 60 (60px/s, 1px/frame)

		 a distance = 60
		 b distance = 30

		 c distance = Math.sqrt(60^2 + 30^2)

		 a velocity = c velocity * (a distance / c distance)
		 b velocity = c velocity * (b distance / c distance)

		*/

		var distance = { 
			x: (this.target.x - this.position.x),
		    y: (this.target.y - this.position.y)
		};

		if (Math.abs(distance.x) < 1 && Math.abs(distance.y) < 1) return;

		distance.vector = Math.hypot(distance.x, distance.y);//Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
	
		this.velocityComponents = {
			x: this.velocity * (distance.x / distance.vector),
			y: this.velocity * (distance.y / distance.vector)
		};

		//determine orientation (try to do by simple formula)
		if (this.isSpriteSheet) {

			if (Math.abs(distance.y) > Math.abs(distance.x)) {
				if (distance.y > 0) {
					this.orientation = 0;
				} else {
					this.orientation = 1;
				}
			} else {
				if (distance.x < 0) {
					this.orientation = 2;
				} else {
					this.orientation = 3;
				}
			}

		}

		// Setup promise so that the caller can wait until
		// the move has finished (causing the promise to be fullfilled)
		// https://javascript.info/promise-basics
		// https://stackoverflow.com/questions/26150232/resolve-javascript-promise-outside-function-scope

		var outsideResolve;

		let promise = new Promise(function(resolve) { 
    		outsideResolve = resolve; 
   		});

		this.outsideResolve = outsideResolve;

		return promise;
	}

	// SpriteSheet
	draw(ctx) {

		ctx.save();

		 //context.save();

             /*   ctx.textBaseline = "top";
                ctx.fillStyle = this._textColor || "rgb(0,0,0)";
                ctx.font = "10px sans-serif";
                ctx.textAlign = this._textAlign;

                ctx.fillText("Hello", 10.5, 10.5);
*/
                //context.restore();

		ctx.translate(this.position.x, this.position.y)

		// image can be a sprite sheet with images for the 4 directions.
		ctx.drawImage(this.image, this.dimensions.width * this.orientation, 0, this.dimensions.width, this.dimensions.height, this.origin.x, this.origin.y, this.dimensions.width, this.dimensions.height);

		ctx.restore();
	}

	// Actor
	box() {
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

	// Actor
	isInBox(point) {

		var box = this.box();

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
		if (this.oldPosition) {
			ctx.strokeRect(this.oldPosition.x + this.origin.x, this.oldPosition.y + this.origin.y, this.dimensions.width, this.dimensions.height);
		} else {
			ctx.strokeRect(this.position.x + this.origin.x, this.position.y + this.origin.y, this.dimensions.width, this.dimensions.height);	
		}

		// target
		if (this.target) {
			ctx.strokeRect(this.target.x + this.origin.x, this.target.y + this.origin.y, this.dimensions.width, this.dimensions.height);
		}

		// line to target
		if (this.oldPosition && this.target) {
			ctx.beginPath();
			ctx.moveTo(this.oldPosition.x, this.oldPosition.y);
			ctx.lineTo(this.target.x,this.target.y);
			ctx.stroke();
		}

		ctx.restore();

	}
		
	// Actor
	update(delta) {

		if (this.target == null) return;

		var dx = this.velocityComponents.x * delta / 1000;
		var dy = this.velocityComponents.y * delta / 1000;

		if (dx > 0) {
			if (dx > (this.target.x - this.position.x)) {
				this.position.x = this.target.x;
			} else {
				this.position.x += dx;
			}
		} else {
			if (dx < (this.target.x - this.position.x)) {
				this.position.x = this.target.x;
			} else {
				this.position.x += dx;
			}
		}

		if (dy > 0) {
			if (dy > (this.target.y - this.position.y)) {
				this.position.y = this.target.y;
			} else {
				this.position.y += dy;
			}
		} else {
			if (dy < (this.target.y - this.position.y)) {
				this.position.y = this.target.y;
			} else {
				this.position.y += dy;
			}
		}

		//this.position.x = Math.floor(this.position.x);
		//this.position.y = Math.floor(this.position.y);

		if (!this.isMoving()) {
			this.outsideResolve();
		}
	};

	// Actor
	isMoving() {
		if (this.target == null) return false;
		return (this.position.x != this.target.x) || (this.position.y != this.target.y);
	}

}