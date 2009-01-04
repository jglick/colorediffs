eval(loadFile("content/colorediffs/globals.js"));
eval(loadFile("content/colorediffs/callbacks.js"));

test__TooltipCallback = function() {
    var me = colorediffsGlobal;

    me.isActive = function() {return true;};

    assert.that(me.tooltipCallback(document.getElementById('first-test')), is.true());
    assert.that(document.getElementById('colorediff-tooltip').value, is.eq("nice tooltip"));

    assert.that(me.tooltipCallback(document.getElementById('second-test')), is.true());
    assert.that(document.getElementById('colorediff-tooltip').value, is.eq("another nice tooltip"));

    assert.that(me.tooltipCallback(document.getElementById('third-test')), is.false());

    me.isActive = function() {return false;};
    assert.that(me.tooltipCallback(document.getElementById('first-test')), is.false());
};

// function test__ScrollCallback() {
// 	var me = colorediffsGlobal;

// 	var left = document.getElementById("left");
// 	var right = document.getElementById("left");

// 	left.scrollLeft = 5;
// 	me.scrollCallback({target:left});
// 	assertEquals("check left scroll", 5, right.scrollLeft);

// 	right.scrollLeft = 3;
// 	me.scrollCallback({target:right});
// 	assertEquals("check right scroll", 3, left.scrollLeft);
// }