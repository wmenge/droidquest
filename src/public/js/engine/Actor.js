class Actor extends Prop { 

	constructor(sprite) {

		super(sprite);

		this.target = null;
		this.velocity = 60; // pixels per second

		var _this = this;
		this.animationSheetPromise = getSprite(sprite).then(function(animationSheet) {
			_this.animationSheet = animationSheet;
		});
	
		// rename to sprite state (or direction on actor level)
		this.state = "Front";
		this.tag = this.state;

		// call back functions
		this.onTarget = null;
		this.onMoveStart = null;

		//this.position = { x: 0, y: 0 };
		
		this.talkingSpeed = 25; // characters per second
	}

	// Load resourdes with loader. Loader is called when the parent room is being entered
    // Assume these are loaded when the show() method is called
    loadResource() {

    	if (!PIXI.loader.resources["resources/sprites/" + this.prite + ".json"]) {
	    	PIXI.loader.add("resources/sprites/" + this.sprite + ".json");
    	}    	
    	
    	super.loadResource();
	}

	setVelocity(velocity) {
		this.velocity = velocity;
		return this;
	}

	/*setScaleFactor(scaleFactor) {
		this.scaleFactor = scaleFactor;
		return this;
	}*/

	setState(state) {
		this.state = state;
		this.tag = this.state;
		return this;
	}

	setTalkingSpeed(talkingSpeed) {
		this.talkingSpeed = talkingSpeed;
		return this;
	}

	setDialogColor(color) {
		this.dialogColor = color;
		return this;
	}
 
	show() {

		super.show();

		// move to engine
		engine.addMovable(this);
		
		return this;
	}

	hide() {

		super.hide();

		engine.removeMovable(this);

		return this;
	}
	
	wait(timeout) {

	  console.debug(this.name, 'waits for', timeout, 'ms');

	  let promise = new Promise((resolve, reject) => {
	    setTimeout(() => resolve(), timeout)
	  });

	  return promise;
	}

	moveRelative(relativeTarget) {
		return this.moveTo(
			{ x: this.position.x + relativeTarget.x, 
			  y: this.position.y + relativeTarget.y
			});
	}

	moveTo(newTarget, walkbox) {

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
		
	//pixi js delta is a factor: 1 means each frame is running as expected
	update(delta) {

		// get correct animation frame
		if (this.animationSheet) {
			var frame = this.animationSheet.getFrame(app.ticker.lastTime, this.tag);
			let rectangle = new PIXI.Rectangle(frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h);
			this.sprite.texture.frame = rectangle;
		} else {
			let rectangle = new PIXI.Rectangle(0, 0, this.sprite.width, this.sprite.height);
			this.sprite.texture.frame = rectangle;
		}

		//console.debug('entering update of', this.name);
		if (this.target == null) {
			this.tag = this.state;
			return;
		}

		var dx = this.velocityComponents.x * delta / 60;
		var dy = this.velocityComponents.y * delta / 60;

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

		//console.debug('updating' + this.name, 'position at', this.position);
		this.sprite.position.set(
			this.position.x - this.origin.x,
			this.position.y - this.origin.y)

		if (this.debugGraphics) {
			this.debugGraphics.position.set(
				this.position.x - this.origin.x,
				this.position.y - this.origin.y)
		}

		// temp, implement zindex as layers
		this.sprite.zOrder = this.position.y;
		this.sprite.zIndex = this.zIndex ? this.zINdex : this.position.y;

		if (!this.isMoving()) {
			this.tag = this.state;
			this.oldPosition = null;
			this.target = null;
			this.outsideResolve();

			console.debug(this.name, 'arrived at', this.position);
		}
	};

	isMoving() {
		if (this.target == null) return false;
		return (this.position.x != this.target.x) || (this.position.y != this.target.y);
	}

	// todo: create talkbubble class?
	// TODO: disable normal interactino during speech?
	talk(line, direction = "Front") {

		const screenMargin = 10;
		const dialogWidth = 200;
		const baselineDuration = 500; //ms
		const dialogPrePause = 200;

		this.setState(direction);

		console.info(this.name + 'says:');

		// duration = baseline duration + time per character
		// this way, shorter lines get more time than long lines
		var duration = baselineDuration + line.length / this.talkingSpeed * 1000;

		var text = new Text(line).setMaxWidth(dialogWidth).setColor(this.dialogColor ? this.dialogColor : "#FFFFFF");

		text.setAlignment('center')
			
		var actorDimensions = { width: this.sprite.width, height: this.sprite.height };
		var textDimensions = text.getDimensions();
		
		/*var textPosition = { 
			x: Math.min(engine.gameDimensions.width - (dialogWidth + screenMargin), Math.max(screenMargin, _this.position.x - (dialogWidth/2))), 
			y: _this.position.y - (dimensions.height + screenMargin) 
		};*/
		
		var textPosition = { 
			x: Math.min(engine.gameDimensions.width - (textDimensions.width + screenMargin), Math.max(screenMargin, this.position.x - (textDimensions.width / 2))),
			y: this.position.y - (actorDimensions.height + textDimensions.height) 
		};

		text.setPosition(textPosition);
			
		/*if (_this.position.x <= (dialogWidth/2 - screenMargin)) {
			text.addClassName('left');
		} else if (_this.position.x >= engine.gameDimensions.width - (dialogWidth + screenMargin)) {
			text.addClassName('right');
		} else {
			text.addClassName('center');
		}*/
	
		setTimeout(function() {
			text.show(null, true);
		}, dialogPrePause);

		var outsideResolve;

		let promise = new Promise(function(resolve) { 
			outsideResolve = resolve; 
		});

		setTimeout(function() {
			text.hide();
			outsideResolve();
		}, duration + dialogPrePause);
	
		return promise;
	}

}