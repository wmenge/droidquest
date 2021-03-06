
/*class Sprite {

	constructor(image) {
		this.image = image
	}

	draw(ctx, x, y, tag, time, scaleFactor) {
		ctx.drawImage(
			this.image, 
			x, 
			y,
			this.image.naturalWidth * scaleFactor.x, 
			this.image.naturalHeight * scaleFactor.y);
	}

	getDimensions() {
		if (!this.dimensions) {
			this.dimensions = { width: this.image.width, height: this.image.height };
		}

		return this.dimensions;
	}

}*/

class Animation {

	constructor(animationInformation, allFrames) {

		if (animationInformation.from == animationInformation.to) {
			this.frames = [ allFrames[animationInformation.from] ];
			this.duration = 0;
		} else {
			this.frames = allFrames.slice(animationInformation.from, animationInformation.to+1);
			// Calculate duration of entire animation tag
			this.duration = this.frames.map(frame => frame.duration).reduce((prev, next) => prev + next);
		}

	}

	getFrameIndex(time) {
		
		time = time % this.duration;

		var i = -1;
		var duration = 0
		
		do {
			i++;
			duration += this.frames[i].duration;
		} while (duration < time)

		return i;
	}

	getFrame(time) {
		return this.frames[this.getFrameIndex(time)];
	}

}

//rename to animationsheet
class SpriteSheet { //extends Sprite {

	constructor(sheetInformation) {

		//super(image);
		
		this.animations = {};

		// convert Aseprite json object to suitable datastructure
		for (var i in sheetInformation.meta.frameTags) {
			var tag = sheetInformation.meta.frameTags[i];
			this.animations[tag.name] = new Animation(tag, sheetInformation.frames)
		}

	}

	getDimensions() {
		// Assume all frames have the same dimensions
		if (!this.sheetDimensions) {
			var animation = this.animations[Object.keys(this.animations)[0]];
			this.sheetDimensions = { width: animation.frames[0].sourceSize.w, height: animation.frames[0].sourceSize.h };
		}

		return this.sheetDimensions;
	}

	// Sprite/sheet
	getFrame(time, tag) {

		var animation = this.animations[tag];
		var frame = animation.getFrame(time);

		return frame
		
		/*ctx.save();

		ctx.drawImage(
			this.image, 
			frame.frame.x, 
			frame.frame.y, 
			frame.sourceSize.w, 
			frame.sourceSize.h, 
			x, 
			y,
			frame.sourceSize.w * scaleFactor.x, 
			frame.sourceSize.h * scaleFactor.y);

		ctx.restore();*/

	}

}

// todo: replace with pixi loader mechanism?
var spriteCache = {}

function getSprite(name) {

	// first check if we have the sprite in cache
	// always return a promise
	if (name in spriteCache) {
		return Promise.resolve(spriteCache[name]);
	}

	// https://davidwalsh.name/fetch
	var promise = new Promise(function(resolve, reject) {

		//var image = new Image();
		//image.src = '/resources/sprites/' + name + '.png';

		// url (required), options (optional)
		fetch('resources/sprites/' + name + '.json', {
			method: 'get'
		}).then(async function(response) {

			if (response.status == 200) {
				var sheetInformation = await response.json();
				var sprite = new SpriteSheet(sheetInformation);
				resolve(sprite);
			} else {
			//	var sprite = new Sprite(image);
			}

			
		}).catch(function(err) {
			resolve(sprite);
		});

		// todo: reject when neither image nor json can be found
		////reject(err);
	});

	spriteCache[name] = promise;

	return promise;

}