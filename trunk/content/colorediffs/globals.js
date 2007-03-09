if (!colorediffsGlobal) {
	var colorediffsGlobal = new Object();
}

String.prototype.match_perl_like = function(regexp) {
	var res = this.match(regexp);
	if (res) {
		for ( var i = 0; i < res.length; i++ ) {
			eval("$" + i + "='" + escape(res[i]) + "'");
		}
	}
	return res;
}

colorediffsGlobal.$ = function(id) {
	return document.getElementById(id);
}

colorediffsGlobal.getMessagePane = function() {
	if (!this.gmessagePane) {
		this.gmessagePane = this.$("messagepane");
	}

	return this.gmessagePane;
}

colorediffsGlobal.isActive = function(m) {
	return this.$("colorediff-mode").value;
}

colorediffsGlobal.setActive = function(m) {
	this.$("colorediff-mode").value = m;
}

document.getElementsByClassName = function(className, parentElement) {
	var elements = [];
	var qwe = parentElement.getElementsByTagName("*");
	for (var i = 0; i < qwe.length; i++) {
		if (qwe[i] && qwe[i].getAttribute("class") === className) {
			elements.push(qwe[i]);
		}
	}

	return elements;
}

String.prototype.pad = function(l, s) {
	if (!s) s = " ";
	var n = this;
	while (l > n.length) {
		n += s;
	}
	return n;
}

colorediffsGlobal.isUpperCaseLetter = function(c) {
	return /^[A-Z]$/.test(c);
}

colorediffsGlobal.getPrefs = function() {
	return Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
}