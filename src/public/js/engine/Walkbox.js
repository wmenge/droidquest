class Walkbox {
	
	constructor(points) {
		this._points = points;
	}

	activate() {
		engine.debuggables.push(this);
	}

	deactivate() {

		var index = engine.debuggables.indexOf(this);
		
		if (index > -1) {
  			engine.debuggables.splice(index, 1);
		}

	}

	// From https://github.com/substack/point-in-polygon
	contains(point) {
	    // ray-casting algorithm based on
	    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

	    var inside = false;

	    for (var i = 0, j = this._points.length - 1; i < this._points.length; j = i++) {

	    	var vi = this._points[i];
	    	var vj = this._points[j];

	        var intersect = ((vi.y > point.y) != (vj.y > point.y))
	            && (point.x < (vj.x - vi.x) * (point.y - vi.y) / (vj.y - vi.y) + vi.x);
	        console.log('intersect: ', intersect);
	        if (intersect) inside = !inside;
	    }

	    return inside;
	};

	get lines() {

		var lines = [];

		for (var i in this._points) {
			var j = (parseInt(i, 10) + 1) % this._points.length;
			lines.push({ a: this._points[i], b: this._points[j] } );
		}

		return lines;
	}

	correctedTarget(origin, target) {

		var lines = this.lines;
		var intersections = [];

		for (var i in lines) {

			var wbLine = lines[i];

			var intersection = math.intersect([wbLine.a.x, wbLine.a.y], [wbLine.b.x, wbLine.a.y], [origin.x, origin.y], [target.x, target.y]);

			if (intersection) {

				var newTarget = { x: intersection[0], y: intersection[1] };
				intersections.push(newTarget);
				console.log('Walkbox corrected target', newTarget);
				console.log('Distance:', math.distance([newTarget.x, newTarget.y], [target.x, target.y]));
			
			}

		}

		// get intersection closest to actual target
		intersections.sort(function(a, b) {
			return math.distance([a.x, a.y], [target.x, target.y]) - math.distance([b.x, b.y], [target.x, target.y]);
		})

		return intersections[0];

	}

	debug(ctx) {

		ctx.save();

		ctx.strokeStyle = "#0044FF";

		// Makes sure that lines and sprites align nicely to the middle of pixels
		// (otherwise lines become blurred between 2 lines/rows)
		ctx.translate(.5, .5);

		ctx.beginPath();

		for (var i in this._points) {

			var point = this._points[i];

			if (i == 0) {
				ctx.moveTo(point.x, point.y);
			} else {
				ctx.lineTo(point.x, point.y);
			}
		}

		ctx.closePath();

		ctx.stroke();

		// old position
		//ctx.strokeRect(this._position.x, this._position.y, this._dimensions.width, this._dimensions.height);

		ctx.restore();
		
	}
}