class Text {
	
	constructor(content) {

		this.type = "div"
		this.content = content;
		this.position = { x: 0, y: 0 };
		this.dimensions = null;
		this.className = 'textOverlay';
		this.classList = []
		
	}

	setType(type) {
		this.type = type;
		return this;
	}

	setPosition(position) {
		this.position = position;
		return this;
	}

	setDimensions(dimensions) {
		this.dimensions = dimensions;
		return this;
	}

	addClassName(className) {
		this.classList.push(className);
		return this;
	}

	show(effect) {

		if (effect) {
			console.info(effect, ':', this.content);
		} else {
			console.info(this.content);
		}
		
		this.element = document.createElement(this.type);
		
		if (this.className) {
			this.element.classList.add(this.className);
		}

		if (effect) {
			this.element.classList.add(effect);
		}

		//this.element.classList.add('debug');

		for (var i in this.classList) {
			this.element.classList.add(this.classList[i]);
		}
		
		// rough positioning
		this.element.style.marginLeft = (this.position.x / 460 * 100) + "%";
		// strange magic factor is needed on y-axis (probably a css issue)
		this.element.style.marginTop = (this.position.y / (240 * 1.92) * 100) + "%";
		
		// rough sizing
		if (this.dimensions) {
			this.element.style.width = (this.dimensions.width / 460 * 100) + "%";
			this.element.style.height = (this.dimensions.height / 240 * 100) + "%";
		}

	    this.element.innerHTML = this.content;
	    document.getElementById('overlayContainer').appendChild(this.element);

		return this;
	}

	hide(effect) {

		if (effect) {
			console.debug('hide with', effect, this.content);
			this.element.classList.add(effect);
		} else {
			if (this.element.parentNode) {
				console.debug('hide', this.content);
				this.element.parentNode.removeChild(this.element);
			}
		}


		return this;
	}

}