colorediffsGlobal.include("views/side-by-side-view.js");

colorediffsGlobal.render = function(il) {
	return colorediffsGlobal.views[colorediffsGlobal.mode.get()].render(il);
}
