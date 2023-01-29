class Button extends Text {
	
	constructor(content) {

		super(content);

		this.fontStyle = text.Font.FONT_DEFAULT;
		this.color = "#000000";

//		this.type = 'button';
		//this.className = "";
		
	}

	show(effect) {

		if (!this.bitmapFontText) this.bitmapFontText = this.createBitmapFont();
		this.bitmapFontText.maxWidth = 200;

		this.bitmapFontText.x += 7;
		this.bitmapFontText.y += 4;

		// draw a rounded rectangle
		this.graphics = new PIXI.Graphics();
		this.graphics.name = this.content;

		var bounds = this.bitmapFontText.getBounds();

		this.graphics.lineStyle(1, 0x000000, 1, 0);
		this.graphics.beginFill(0xFFFFFF, 1);
		this.graphics.drawRoundedRect(bounds.x - 6, bounds.y - 3, bounds.width + 12, bounds.height + 6, 3);
		this.graphics.interactive = true;
		this.graphics.buttonMode = true;

		this.graphics.endFill();

		this.graphics.tint = 0xFFD700;

		app.stage.addChild(this.graphics);

		this.graphics.addChild(this.bitmapFontText);

		this.graphics.click = this.selectHandler;

		var _this = this;

		// higlight events
		this.graphics.mouseover = function() {
			if (_this.graphics.tint != 0xFFFF66) _this.graphics.tint = 0xFFFF66;
		}

		this.graphics.mouseout = function() {
			if (_this.graphics.tint != 0xFFD700) _this.graphics.tint = 0xFFD700;
		}

		this.graphics.parentGroup = uiGroup;

		engine.addDebugable(this);

		return this;

		//return super.show(effect);
	}

	hide() {
		engine.removeDebugable(this);
		app.stage.removeChild(this.graphics);
	}

	onSelect(handler) {
		this.selectHandler = handler;

		return this;
	}

	debug() {

		this.debugGraphics = new PIXI.Graphics();

		app.stage.addChild(this.debugGraphics);

		this.debugGraphics.lineStyle(1, 0xff0000);

		// draw rect
		this.debugGraphics.drawRect(this.bitmapFontText.x, this.bitmapFontText.y, this.bitmapFontText.width, this.bitmapFontText.height);
	}

	debugOff() {
		app.stage.removeChild(this.debugGraphics);
		this.debugGraphics == null;
	}
}