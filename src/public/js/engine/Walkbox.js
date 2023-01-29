class Walkbox {
	
	constructor(points) {
		this._points = points;
	}

	activate() {
		engine.addDebugable(this);
	}

	deactivate() {
		engine.removeDebugable(this);
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

	checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
	    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
	    var denominator, a, b, numerator1, numerator2, result = {
	        x: null,
	        y: null,
	        onLine1: false,
	        onLine2: false
	    };
	    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
	    if (denominator == 0) {
	        return result;
	    }
	    a = line1StartY - line2StartY;
	    b = line1StartX - line2StartX;
	    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
	    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
	    a = numerator1 / denominator;
	    b = numerator2 / denominator;

	    // if we cast these lines infinitely in both directions, they intersect here:
	    result.x = line1StartX + (a * (line1EndX - line1StartX));
	    result.y = line1StartY + (a * (line1EndY - line1StartY));
	/*
	        // it is worth noting that this should be the same as:
	        x = line2StartX + (b * (line2EndX - line2StartX));
	        y = line2StartX + (b * (line2EndY - line2StartY));
	        */
	    // if line1 is a segment and line2 is infinite, they intersect if:
	    if (a > 0 && a < 1) {
	        result.onLine1 = true;
	    }
	    // if line2 is a segment and line1 is infinite, they intersect if:
	    if (b > 0 && b < 1) {
	        result.onLine2 = true;
	    }
	    // if line1 and line2 are segments, they intersect if both of the above are true
	    return result;
	};


	correctedTarget(origin, target) {

		var lines = this.lines;
		var intersections = [];

		for (var i in lines) {

			var wbLine = lines[i];

			var result = this.checkLineIntersection(origin.x, origin.y, target.x, target.y, wbLine.a.x, wbLine.a.y, wbLine.b.x, wbLine.b.y);

			if (result.onLine1 && result.onLine2) return { x: Math.round(result.x), y: Math.round(result.y) };

		}
	}

	debug() {

		this.debugGraphics = new PIXI.Graphics();
		
		app.stage.addChild(this.debugGraphics);

		// draw line
		this.debugGraphics.lineStyle(1, 0x0000ff);

		if (this._points.length > 2) {

			for (var i in this._points) {

				var point = this._points[i];

				if (i == 0) {
					this.debugGraphics.moveTo(point.x, point.y);
				} else {
					this.debugGraphics.lineTo(point.x, point.y);
				}
			}

			var point = this._points[0];

			this.debugGraphics.lineTo(point.x, point.y);

		}

		this.debugGraphics.endFill();

	}

	debugOff() {

		app.stage.removeChild(this.debugGraphics);

	}

	/*debug(ctx, scaleFactor) {

		ctx.save();

		ctx.strokeStyle = "#0044FF";

		ctx.beginPath();

		for (var i in this._points) {

			var point = this._points[i];

			if (i == 0) {
				ctx.moveTo(point.x * scaleFactor.x, point.y * scaleFactor.y);
			} else {
				ctx.lineTo(point.x * scaleFactor.x, point.y * scaleFactor.y);
			}
		}

		ctx.closePath();

		ctx.stroke();

		ctx.restore();
		
	}*/
}