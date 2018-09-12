class Button extends Text {
	
	constructor(content) {

		super(content);

		this.type = 'button';
		this.className = "";
		
	}

	show(effect) {

		this.className = '';
		this.dimensions = null;

		var returnValue = super.show(effect);

		this.element.addEventListener("click", this.selectHandler);

		return returnValue;
	}

	onSelect(handler) {
		this.selectHandler = handler;

		return this;
	}
}