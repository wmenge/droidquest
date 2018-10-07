class Walkbox {
	
	constructor(points) {
		this._points = points;
	}

	activate() {
		engine.debuggables.push(this);

		// temp: show coordinates
		/*for (var i = 0; i < this._points.length; i++) {

			var point = this._points[i];

			var text = new Text(point.x + ', ' + point.y)
				.setPosition(point)
				.addClassName('center')
				.addClassName('small')
				.setDimensions({ width: 50, height: 0})
				.addClassName('outline')
				.show();

		}*/

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

		console.log('movement line:', origin, target);

		for (var i in lines) {

			var wbLine = lines[i];

			var result = this.checkLineIntersection(origin.x, origin.y, target.x, target.y, wbLine.a.x, wbLine.a.y, wbLine.b.x, wbLine.b.y);

			if (result.onLine1 && result.onLine2) return { x: result.x, y: result.y };

			/*var intersection = math.intersect([wbLine.a.x, wbLine.a.y], [wbLine.b.x, wbLine.a.y], [origin.x, origin.y], [target.x, target.y]);

			if (intersection) {

				var newTarget = { x: intersection[0], y: intersection[1] };
				intersections.push(newTarget);
				console.log('Check line', wbLine);
				console.log('Intersection', intersection);
				console.log('Distance:', math.distance([newTarget.x, newTarget.y], [target.x, target.y]));
			
			}*/

		}

		// get intersection closest to actual target
		/*intersections.sort(function(a, b) {
			return math.distance([a.x, a.y], [target.x, target.y]) - math.distance([b.x, b.y], [target.x, target.y]);
		})

		return intersections[0];
*/
	}

	debug(ctx, scaleFactor) {

		ctx.save();

		ctx.strokeStyle = "#0044FF";

		// Makes sure that lines and sprites align nicely to the middle of pixels
		// (otherwise lines become blurred between 2 lines/rows)
		//ctx.translate(.5, .5);

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

		// old position
		//ctx.strokeRect(this._position.x, this._position.y, this._dimensions.width, this._dimensions.height);

		ctx.restore();
		
	}
}