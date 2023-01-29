var text = { 
	Font: {
		FONT_DEFAULT: '8px C64 Pro',
		FONT_OUTLINE: '8px C64 Pro Outline'
	},
	Align: {
		LEFT: 'left',
		CENTER: 'center',
		RIGHT: 'right'
	}
}

// Load resourdes with loader. Loader is called when the parent room is being entered
// Assume these are loaded when the show() method is called
if (!PIXI.loader.resources["resources/fonts/c64-outline.xml"]) {
	PIXI.loader.add("resources/fonts/c64-outline.xml");
}

if (!PIXI.loader.resources["resources/fonts/c64.xml"]) {
	PIXI.loader.add("resources/fonts/c64.xml");
}

class Text {
	
	constructor(content) {

		this.content = content;
		this.position = { x: 0, y: 0 };

		// TODO: Rename to width
		this.maxWidth = 460;
		
		this.color = '#FFFFFF';
		
		this.fontStyle = text.Font.FONT_OUTLINE;
		this.alignment = text.Align.LEFT;
	}

	setPosition(position) {
		this.position = position;

		if (this.bitmapFontText) {
			this.bitmapFontText.x = this.position.x;
	        this.bitmapFontText.y = this.position.y;
		}

		return this;
	}

	setMaxWidth(maxWidth) {
		this.maxWidth = maxWidth;
		return this;
	}

	setColor(color) {
		this.color = color;
		return this;
	}

	setFontStyle(fontStyle) {
		this.fontStyle = fontStyle;
		return this;
	}

	setAlignment(alignment) {
		this.alignment = alignment;
		return this;
	}

	getDimensions() {
		if (!this.bitmapFontText) this.bitmapFontText = this.createBitmapFont();

		return { width: this.bitmapFontText.textWidth, height: this.bitmapFontText.textHeight };
	}
	
	createBitmapFont() {

		var bitmapFontText = new PIXI.extras.BitmapText(
			this.content, 
			{ 
				font: this.fontStyle, 
				align: this.alignment,
				tint: parseInt(this.color.replace('#', ''), 16),
			}
		);

        bitmapFontText.x = this.position.x;
        bitmapFontText.y = this.position.y;

        bitmapFontText.maxWidth = this.maxWidth;
        
        return bitmapFontText;

	}

	show(effect) {

		/*if (effect) {
			console.info(effect, ':', this.content);
		} else {
			console.info(this.content);
		}*/

		if (!this.bitmapFontText) this.bitmapFontText = this.createBitmapFont();

        app.stage.addChild(this.bitmapFontText);
        this.bitmapFontText.parentGroup = uiGroup;

        engine.addDebugable(this);
		
		return this;
	}

	hide(effect) {

		engine.removeDebugable(this);

		app.stage.removeChild(this.bitmapFontText);

		/*if (effect) {
			console.debug('hide with', effect, this.content);
			this.element.classList.add(effect);
		} else {
			if (this.element.parentNode) {
				console.debug('hide', this.content);
				this.element.parentNode.removeChild(this.element);
			}
		}*/
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