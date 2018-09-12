class Text {
	
	constructor(content) {

		this._type = "div"
		this._content = content;
		this._position = { x: 0, y: 0 };
		this._dimensions = null;
		this._className = 'textOverlay';
		this._classList = []
		
	}

	type(type) {
		this._type = type;
		return this;
	}

	/*text(text) {
		this._text = text;
		return this;
	}*/

	position(position) {
		this._position = position;
		return this;
	}

	dimensions(dimensions) {
		this._dimensions = dimensions;
		return this;
	}

	className(className) {
		this._classList.push(className);
		return this;
	}

	show(effect) {

		console.log('show', this._content, 'with effect: ', effect);
		
		this._element = document.createElement(this._type);
		
		if (this._className) {
			this._element.classList.add(this._className);
		}

		if (effect) {
			this._element.classList.add(effect);
		}

		//this._element.classList.add('debug');

		for (var i in this._classList) {
			this._element.classList.add(this._classList[i]);
		}
		
		// rough positioning
		this._element.style.marginLeft = (this._position.x / 460 * 100) + "%";
		this._element.style.marginTop = (this._position.y / 240 * 100) + "%";

		// rough sizing
		if (this._dimensions) {
			this._element.style.width = (this._dimensions.width / 460 * 100) + "%";
			this._element.style.height = (this._dimensions.height / 240 * 100) + "%";
		}

	    this._element.innerHTML = this._content;
	    document.getElementById('overlayContainer').appendChild(this._element);

		return this;
	}

	hide(effect) {

		console.log('hide', this._content, 'with effect: ', effect);
		
		if (effect) {
			console.log('show', this._content, 'with effect: ', effect);
		} else {
			console.log('show', this._content);
		}


		if (effect) {
			console.log('hide', effect);
			this._element.classList.add(effect);
		} else {
			this._element.parentNode.removeChild(this._element);
		}


		return this;
	}

}