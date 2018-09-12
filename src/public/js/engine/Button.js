class Button extends Text {
	
	constructor(content) {

		super(content);

		this._type = 'button';
		this._className = "";
		
	}

	show(effect) {

		this._className = '';
		this._dimensions = null;

		var returnValue = super.show(effect);

		this._element.addEventListener("click", this._selectHandler);

		return returnValue;
	}

	onSelect(handler) {
		this._selectHandler = handler;

		return this;
	}
}