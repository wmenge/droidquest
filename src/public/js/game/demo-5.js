class DemoRoom5 extends Room {

	init() {

		super.init();

		this.tower = new Prop()
			.setPosition({ x: 230, y: 120 });
	}


	onEnter() {

		super.onEnter();

		this.text = new Text("Tech demo 5: Text and buttons that can be positioned on pixels")
			.setPosition({ x: 10, y: 5 })
			//.setDimensions({ width: 320, height: 25 })
			//.addClassName('debug')
			//.addClassName('outline')
			.show();

		this.texts = [];

		for (let i = 0; i < 10; i++) {

			let text = new Text("Hello!")
				.setPosition({ x: 60 + i * 30, y: 50 + i * 16 })
				.setColor(RGB2Color(Math.random() *255,Math.random() * 255,Math.random() * 255))
			///	.setDimensions({ width: 35, height: 12 })
			//	.addClassName('outline')
				.show();

			this.texts.push(text);

		}
	}

	onExit() {
		super.onExit();

		for (const text of this.texts) {
			text.hide();
		}

	}

}

function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n) {
	var nybHexString = "0123456789ABCDEF";
	return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function demo5() {
	game.show(new DemoRoom5("tatooine"));
}