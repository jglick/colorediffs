if (!colorediffsGlobal) {
	var colorediffsGlobal = {}
}

colorediffsGlobal.tooltipCallback = function(element) {
	var me = colorediffsGlobal;

	var getTooltip = function () {
		var elem = element;

		while( elem && elem.nodeName.toLowerCase() != "body" && elem.nodeName.toLowerCase() != "browser" && elem.nodeName.toLowerCase() != "html" && (elem.title == null || elem.title == "")	) {
			elem = elem.parentNode;
		}
		return (elem != null && elem.hasAttribute('title'))?elem.title:null;
	}

	if ( me.isActive() ) {
		var title = getTooltip();
		if (title == "") {
			title = null;
		}

		me.$("colorediff-tooltip").value = title;
		return title != null;
	} else {
		return false;
	}

}

colorediffsGlobal.scrollCallback = function(evt) {
	var ourclass = evt.target.getAttribute('class');
	var opositeClass = (ourclass == "left")?"right":"left";

	var otherSide = document.getElementsByClassName(opositeClass, evt.target.parentNode.parentNode /*TR*/)[0];
	otherSide.scrollLeft = evt.target.scrollLeft;
}
