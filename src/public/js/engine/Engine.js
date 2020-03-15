/*function mainLoop(timeStamp) {
	engine.draw(timeStamp);
}*/

function gameLoop(delta) {
	engine.update(delta);
}

// temp, expose from engine
var app = null;

var backgroundGroup = null;
var spriteGroup = null;
var uiGroup = null;

class Engine extends mix(Object).with(EventDispatcher) {

	constructor(canvas) {

		super();

		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

		this.gameDimensions = { width: 460, height: 240 };
		
		// on change, modify cursor (through setter)
		this.enableInput = true;

		this.debugMode = false;

		var _this = this;

		this.addEventListener("target", function(event) {
			_this.onTarget(event);
		});
	}

	init() {

		if (app) app.destroy();

		this.movables = [];
		this.debugables = [];

		var flexContainer = document.getElementById("flexContainer");
		while (flexContainer.firstChild) {
		    flexContainer.removeChild(flexContainer.firstChild);
		}

		// resolution is normally used to aid crisp drawing on retina
		// devices, where there is a ratio between browser/os pixel
		// and physical pixel. In that case, feed window.devicePixelRatio
		// into resolution.
		// In our case, we have a resized 460x240 pixel screen
		// and we want to allow sprites to move in subpixels. 
		// 3 seems a good tradeoff between smooth movement and performance
		app = new PIXI.Application({ 
	        width: this.gameDimensions.width,         // default: 800
	        height: this.gameDimensions.height,        // default: 600
	        antialias: false,    // default: false
	        transparent: false, // default: false
	        resolution: 1, //window.devicePixelRatio,      // default: 1
	      }
	    );

	    app.stage = new PIXI.display.Stage();

	  	//Add the canvas that Pixi automatically created for you to the HTML document
    	flexContainer.appendChild(app.view);

		backgroundGroup = new PIXI.display.Group(0, true);
		spriteGroup = new PIXI.display.Group(1, true);
		uiGroup = new PIXI.display.Group(2, true);

		app.stage.addChild(new PIXI.display.Layer(backgroundGroup));
		app.stage.addChild(new PIXI.display.Layer(spriteGroup));
		app.stage.addChild(new PIXI.display.Layer(uiGroup));
		
		// setup gameloop
		app.ticker.remove(delta => gameLoop(delta));
        app.ticker.add(delta => gameLoop(delta));

        // create a manager instance, passing stage and renderer.view
		//this.manager = new PIXI.InteractionManager(stage, renderer.view);

		app.stage.interactive = true;
		app.stage.click = function(event) {

			// shallow copy by value
			let target = { x: event.data.global.x , y: event.data.global.y };

			engine.dispatchEvent("target", target);
		}



	}

    update(delta) {

		for (var i in this.movables) {
			this.movables[i].update(delta);
			// check if the movable is still moving, in that case, an update is needed
			//if (!this.updateNeeded && this.movables[i].isMoving()) this.updateNeeded = true;
	    }

	}

	onTarget() {

	}

	addMovable(movable) {
		this.movables.push(movable);
	}

	removeMovable(movable) {
		let index = this.movables.indexOf(movable);
		
		if (index > -1) {
  			this.movables.splice(index, 1);
		}
	}

	addDebugable(debugable) {
		this.debugables.push(debugable);

		if (this.debugMode) {
			debugable.debug();
		}
	}

	removeDebugable(debugable) {

		let index = this.debugables.indexOf(debugable);
		
		if (index > -1) {
  			this.debugables.splice(index, 1);
		}

		debugable.debugOff();
	
	}

	toggleDebug() {

		this.debugMode = !this.debugMode;

		if (this.debugMode) {
			for (var i in this.debugables) {
				this.debugables[i].debug();
		    }
		} else {
			for (var i in this.debugables) {
				this.debugables[i].debugOff();
		    }
		}
	}

}

function onKeyDown(event) {

	event.preventDefault();

	//if (!engine.enableInput) return;

	if (event.key == "d") {
		engine.toggleDebug();
	}

}

window.addEventListener('keydown',onKeyDown,false);

engine = new Engine(document.getElementById('gameCanvas'));