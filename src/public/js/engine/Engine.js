function mainLoop(timeStamp) {
	engine.draw(timeStamp);
}

class Engine extends mix(Object).with(EventDispatcher) {

	constructor(canvas) {

		super();

		this.canvas = canvas,
		
		this.ctx = this.canvas.getContext('2d');
		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.webkitImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;

		// Show debug lines in bright red
		this.ctx.strokeStyle = "#FF0000";

		// move to room level?
		this.drawables = [];
		this.movables = [];
		this.debuggables = [];

		this.debugMode = false;
		this.lastFrameTimeMs = 0;
		this.maxFPS = 120;

		// on change, modify cursor (through setter)
		this.enableInput = true;

		var _this = this;

		this.addEventListener("target", function(event) {
			_this.onTarget(event);
		});
	}

	//updateNeeded: false,
	zsort() {

		this.drawables.sort(function(a, b) { 
			if (a.zIndex == b.zIndex) {
				return a.position.y - b.position.y;
			} else {
				return a.zIndex - b.zIndex;
			}
		});

	}

	init() {

		// register click/touch events
		this.canvas.addEventListener("click", onMouseClick, false);
		this.canvas.addEventListener("touchstart", onTouchStart, false);
		
		window.addEventListener('keydown',onKeyDown,false);
		this.coordinatesOverlay = document.getElementById('coordinates');

		if (this.coordinatesOverlay) {
			this.canvas.addEventListener("mousemove", onMouseMove, false);
		}
	}

    draw(timestamp) {

    	// Assume that no update is needed after this frame
    	//this.updateNeeded = false;

		// Throttle the frame rate.    
	    if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
	        requestAnimationFrame(mainLoop);
	        return;
	    }

	    var delta = timestamp - this.lastFrameTimeMs; // get the delta time since last frame
	    this.lastFrameTimeMs = timestamp;

	    var ctx = this.ctx;

		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas

		ctx.save();

		this.zsort();

		for (var i in this.movables) {
			this.movables[i].update(delta);
			// check if the movable is still moving, in that case, an update is needed
			//if (!this.updateNeeded && this.movables[i].isMoving()) this.updateNeeded = true;
	    }

		for (var i in this.drawables) {
			this.drawables[i].draw(ctx);
	    }

	    if (this.debugMode) {

			for (var i in this.drawables) {
				this.drawables[i].debug(ctx);
		    }

		    for (var i in this.debuggables) {
				this.debuggables[i].debug(ctx);
		    }	    	

		}

		ctx.restore();

		// only request a new frame when an update is needed
        //if (this.updateNeeded) {
			requestAnimationFrame(mainLoop);
        //}
	}

	onTarget() {

	}

	// rename to getposition
	getTarget(event) {

		var target = {
	    	x: Math.floor(event.offsetX * this.canvas.width / this.canvas.clientWidth),
	    	y: Math.floor(event.offsetY * this.canvas.height / this.canvas.clientHeight)
	    };

	    return target;
	}

	// todo: if this works, also use for desktop
	getTouchTarget(event) {
		var target = {
	    	x: Math.floor((event.clientX - this.canvas.offsetLeft) / this.canvas.clientWidth * this.canvas.width),
	    	y: Math.floor((event.clientY - this.canvas.offsetTop) / this.canvas.clientHeight * this.canvas.height)
	    };

	    return target;	
	}

	// rename to getTarget
	// check if drawable has been clicked
	getTargetedMovable(target) {
		for (var i in this.drawables) {

			if (this.drawables[i].isInBox(target)) {
				return this.drawables[i];
			}

	    }

	}
}

function onKeyDown(event) {

	event.preventDefault();

	//if (!engine.enableInput) return;

	if (event.key == "d") {
		engine.debugMode = !engine.debugMode;
	}

}

function onMouseClick(event) {

	console.log('onMouseClick');

	event.preventDefault();

	if (!engine.enableInput) return;

	target = engine.getTarget(event);

	// check if a drawable is been targeted and has registered event handlers
	// if such an object can be found, let it handle the event
	// if none can be found, let the engine handle the event
	targetedObject = engine.getTargetedMovable(target);
	if (targetedObject && targetedObject.onTarget) {
		targetedObject.onTarget();
	} else {
	    engine.dispatchEvent("target", target);
	}

}

function onTouchStart(event) {

	if (!engine.enableInput) return;

	event.preventDefault();

	var touches = event.changedTouches;

	for (var i = 0; i < touches.length; i++) {

		target = engine.getTouchTarget(touches[i]);

		targetedObject = engine.getTargetedMovable(target);
		if (targetedObject && targetedObject.onTarget) {
			targetedObject.onTarget();
		} else {
		    engine.dispatchEvent("target", target);
		}

    }
}

function onMouseMove(event) {

	console.log(event);
	
	event.preventDefault();

	// Todo: correctly determine position of feet of actor
	target = engine.getTarget(event);

	engine.coordinatesOverlay.innerHTML = 
		//event.offsetX + ", " + event.offsetY + "<br />" +
		target.x + ", " + target.y;

    //engine.dispatchEvent("target", target);
}

engine = new Engine(document.getElementById('gameCanvas'));