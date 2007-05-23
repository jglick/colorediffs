colorediffsGlobal.domHelper = function(doc) {

	function addElements(element, start_index, array) {
		var length = array.length;
		for(var i = start_index; i < length; ++i) {
			var arg = array[i];
			switch(typeof arg) {
				case "string":
					element.innerHTML += arg;
					break;
				case "object":
					if (arg instanceof XULElement || arg instanceof HTMLElement) {
						element.appendChild(arg);
					} else if (arg instanceof Array) {
						arguments.callee(element, 0, arg);
					}
					break;
				case "function":
					element.appendChild(arg());
					break;
			}
		}
	}

	this.createElement = function(tag, attributes) {
			var element = doc.createElement(tag);
			for (var attribute in attributes) {
				element.setAttribute(attribute, attributes[attribute]);
			}

			addElements(element, 2, arguments);

			return element;
	};

	this.createDocumentFragment = function() {
			var element = doc.createDocumentFragment();
			addElements(element, 0, arguments);
			return element;
	};
}
