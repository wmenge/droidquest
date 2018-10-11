function mainLoop(timeStamp) {
	engine.draw(timeStamp);
}

class Engine extends mix(Object).with(EventDispatcher) {

	constructor(canvas) {

		super();

		this.canvas = canvas;
		
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
		this.maxFPS = 144;

		// internal scale factor: factor between game pixels and canvas pixels
		// which have nothing to do with screen pixels as the canvas itself
		// can be scaled to fit the browser window
		this.gameDimensions = { width: 460, height: 240 };

		this.scaleFactor = { x: this.canvas.width / this.gameDimensions.width, y: this.canvas.height / this.gameDimensions.height };

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

		// remove any old items
		this.drawables = [];
		this.movables = [];
		this.debuggables = [];

		// remove any old tekst (move to Text class?)
		var overLay = document.getElementById('overlayContainer');//.appendChild(this.element);

		Array.from(overLay.children).forEach(function(item) {
			// bad hack
			if (item.id != "demobuttons") overLay.removeChild(item);
		});
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

	    this.ctx;

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas

		this.zsort();

		for (var i in this.movables) {
			this.movables[i].update(delta);
			// check if the movable is still moving, in that case, an update is needed
			//if (!this.updateNeeded && this.movables[i].isMoving()) this.updateNeeded = true;
	    }

		for (var i in this.drawables) {
			this.drawables[i].draw(this.ctx, timestamp, this.scaleFactor);
	    }

	    // Makes sure that lines and sprites align nicely to the middle of pixels
		// (otherwise lines become blurred between 2 lines/rows)
		this.ctx.save();

		this.ctx.translate(.5, .5);

	    if (this.debugMode) {

			for (var i in this.drawables) {
				this.drawables[i].debug(this.ctx, this.scaleFactor);
		    }

		    for (var i in this.debuggables) {
				this.debuggables[i].debug(this.ctx, this.scaleFactor);
		    }	    	

		}

		this.ctx.restore();

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
	    	x: Math.floor(event.offsetX * this.gameDimensions.width / this.canvas.clientWidth),
	    	y: Math.floor(event.offsetY * this.gameDimensions.height / this.canvas.clientHeight)
	    };

	    return target;
	}

	// todo: if this works, also use for desktop
	getTouchTarget(event) {
		var target = {
	    	x: Math.floor((event.clientX - this.canvas.offsetLeft) / this.canvas.clientWidth * this.gameDimensions.width),
	    	y: Math.floor((event.clientY - this.canvas.offsetTop) / this.canvas.clientHeight * this.gameDimensions.height)
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

	event.preventDefault();

	if (!engine.enableInput) return;

	target = engine.getTarget(event);

	// check if a drawable is been targeted and has registered event handlers
	// if such an object can be found, let it handle the event
	// if none can be found, let the engine handle the event

	// TODO: Supply event with coordinates and target
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

	event.preventDefault();

	// Todo: correctly determine position of feet of actor
	target = engine.getTarget(event);

	engine.coordinatesOverlay.innerHTML = 
		//event.offsetX + ", " + event.offsetY + "<br />" +
		target.x + ", " + target.y;

    //engine.dispatchEvent("target", target);
}

engine = new Engine(document.getElementById('gameCanvas'));