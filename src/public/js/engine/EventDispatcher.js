// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
let mix = (superclass) => new MixinBuilder(superclass);

class MixinBuilder {  
  constructor(superclass) {
    this.superclass = superclass;
  }

  with(...mixins) { 
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}

let EventDispatcher = (superclass) => class extends superclass {

	get eventListeners() {
        if (!this._eventListeners) this._eventListeners = {};
        return this._eventListeners;
    }

    hasEventListenersFor(event) {
    	return this.eventListeners[event] && this.eventListeners[event].length > 0;
    }

	addEventListener(event, listener) {

		if (!this.eventListeners[event]) this.eventListeners[event] = [];

		this.eventListeners[event].push(listener);
	}

	dispatchEvent(event, data) {

		var customEvent = new CustomEvent(event, { detail: data });
		var listeners = this.eventListeners[event];

		if (listeners) {
			for (var i in listeners) listeners[i](customEvent);
		}
	}
};