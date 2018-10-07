class Actor { 

	constructor(sprite) {

		var _this = this;

		if (sprite instanceof Sprite) {
			this.sprite = sprite;
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
		
		this.target = null;
		this.velocity = 60; // pixels per second
		this.state = "Front";
		this.tag = this.state;

		// Actor/prop
		this.zIndex = 0;

		// call back functions
		this.onTarget = null;
		this.onMoveStart = null;
		//this.onMoveEnd = null

		this.shown = false;

		// scalefactor of sprite, set to 2 for jumbo!
		this.scaleFactor = 1;

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

	setVelocity(velocity) {
		this.velocity = velocity;
		return this;
	}

	setScaleFactor(scaleFactor) {
		this.scaleFactor = scaleFactor;
		return this;
	}

	isShown() {
		return this.shown;
		/*var index = engine.drawables.indexOf(this);
		return (index > -1);*/
	}

	// clean up
	show() {
		// wait until sprite has been loaded
		//if (this.sprite) {
		//	engine.drawables.push(this);
		//	engine.movables.push(this);
		//} else {
			var _this = this;
			this.spritePromise.then(function(result) {
				engine.drawables.push(_this);
				engine.movables.push(_this);
			});
		//x}

		this.shown = true;

		console.debug('Show', this.name, 'at', this.position);

		return this;
	}

	hide() {

		var index = engine.drawables.indexOf(this);
		
		if (index > -1) {
  			engine.drawables.splice(index, 1);
		}

		index = engine.movables.indexOf(this);
		
		if (index > -1) {
  			engine.movables.splice(index, 1);
		}

		this.shown = false;

		console.debug('Hide', this.name);

		return this;
	}
	
	// Actor
	wait(timeout) {

	  console.debug(this.name, 'waits for', timeout, 'ms');

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
    		var correctedTarget = walkbox.correctedTarget(this.position, newTarget);
    		console.info('corrected target', newTarget, 'to', correctedTarget, 'by', walkbox);
    		newTarget = correctedTarget;

    	}

    	console.info('Move', this.name, 'to', newTarget);

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
		if (Math.abs(distance.y) > Math.abs(distance.x)) {
			if (distance.y > 0) {
				this.state = "Front"; // enumerations!
			} else {
				this.state = "Back";
			}
		} else {
			if (distance.x < 0) {
				this.state = "Left";
			} else {
				this.state = "Right";
			}
		}

		this.tag = this.state + "Walk";

		// Setup promise so that the caller can wait until
		// the move has finished (causing the promise to be fullfilled)
		// https://javascript.info/promise-basics
		// https://stackoverflow.com/questions/26150232/resolve-javascript-promise-outside-function-scope

		var outsideResolve;

		let promise = new Promise(function(resolve) { 
    		outsideResolve = resolve; 
   		});

		this.outsideResolve = outsideResolve;

		if (this.onMoveStart) {
			this.onMoveStart(this.target);
		}

		return promise;
	}

	// SpriteSheet
	draw(ctx, timestamp, engineScaleFactor) {

		// performance: prevent object creation
		var spriteScale = { x: engineScaleFactor.x * this.scaleFactor, y: engineScaleFactor.y * this.scaleFactor };

		this.sprite.draw(ctx, (this.position.x + this.origin.x * this.scaleFactor) * engineScaleFactor.x, (this.position.y + this.origin.y * this.scaleFactor) * engineScaleFactor.y, this.tag, timestamp, spriteScale);

	}

	// Actor
	box() {

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

	// Actor
	isInBox(point) {

		var box = this.box();

		return (point.x >= box[0].x && 
		        point.x <= box[1].x &&
		        point.y >= box[0].y && 
		        point.y <= box[1].y);
		
	}

	// Sprite
	debug(ctx, engineScaleFactor) {

		// performance: prevent object creation
		var scaleFactor = { x: engineScaleFactor.x * this.scaleFactor, y: engineScaleFactor.y * this.scaleFactor };

		//ctx.save();

		// Makes sure that lines and sprites align nicely to the middle of pixels
		// (otherwise lines become blurred between 2 lines/rows)
		//ctx.translate(.5, .5);

		var dimensions = this.sprite.getDimensions();
	
		// old position
		if (this.oldPosition) {
			ctx.strokeRect((this.oldPosition.x + this.origin.x * this.scaleFactor) * engineScaleFactor.x, (this.oldPosition.y + this.origin.y * this.scaleFactor) * engineScaleFactor.y, dimensions.width * scaleFactor.x, dimensions.height * scaleFactor.y);
		} else {
			ctx.strokeRect((this.position.x + this.origin.x * this.scaleFactor) * engineScaleFactor.x, (this.position.y + this.origin.y * this.scaleFactor) * engineScaleFactor.y, dimensions.width * scaleFactor.x, dimensions.height * scaleFactor.y);	
		}

		// target
		if (this.target) {
			ctx.strokeRect((this.target.x + this.origin.x * this.scaleFactor) * engineScaleFactor.x, (this.target.y + this.origin.y * this.scaleFactor) * engineScaleFactor.y, dimensions.width * scaleFactor.x, dimensions.height * scaleFactor.y);
		}

		// line to target
		if (this.oldPosition && this.target) {
			ctx.beginPath();
			ctx.moveTo(this.oldPosition.x * engineScaleFactor.x, this.oldPosition.y * engineScaleFactor.y);
			ctx.lineTo(this.target.x * engineScaleFactor.x,this.target.y * engineScaleFactor.y);
			ctx.stroke();
		}

		//ctx.restore();

	}
		
	// Actor
	update(delta) {

		if (this.target == null) {
			return;
			this.tag = this.state;
		}

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

		if (!this.isMoving()) {
			this.tag = this.state;
			this.oldPosition = null;
			this.target = null;
			this.outsideResolve();

			console.debug(this.name, 'arrived at', this.position);
		}
	};

	// Actor
	isMoving() {
		if (this.target == null) return false;
		return (this.position.x != this.target.x) || (this.position.y != this.target.y);
	}

}