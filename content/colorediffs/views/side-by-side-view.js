
colorediffsGlobal.views["side-by-side"] = {
 render: function(il, pref, dom) {
		function createCodeElement(side, code) {
			var e = dom.createElement("pre", {'class':side}, code);
			e.addEventListener("scroll", function(evt) {colorediffsGlobal.scrollCallback(evt);}, false);
			return e;
		}

		function pcp(str) {
			return str.replace(/\$cp{(.*?)}/g, function(str, prop) {
					return pref.getColorProps(prop.trim());
				});
		}

		return [
			function() {
				var stylecontent = "";
				stylecontent += "	.log			{$cp{diffColorer.sbs_log		}; padding: 5px; border: 1px solid black;}";
				stylecontent += "	.file-diff		{$cp{diffColorer.sbs_file-diff	}; padding: 3px;margin:5px;}";
				stylecontent += "	.title			{$cp{diffColorer.sbs_title		}; padding: 3px;clear:left;}";
				stylecontent += "	.pre-code		{$cp{diffColorer.sbs_precode	}; margin:0;}";
				stylecontent += "	.addline		{$cp{diffColorer.sbs_addedLine	}}";
				stylecontent += "	.delline		{$cp{diffColorer.sbs_deletedLine}}";
				stylecontent += "	.linetag		{$cp{diffColorer.sbs_anchor		}; text-align:center;clear:left;}";
				stylecontent += "	.steadyline		{$cp{diffColorer.sbs_steadyLine }}";
				stylecontent += "	.left			{$cp{diffColorer.sbs_left		};padding: 5px; margin:0; overflow:auto; border: 1px solid black;}";
				stylecontent += "	.right			{$cp{diffColorer.sbs_right		};padding: 5px; margin:0; overflow:auto; border: 1px solid black;}";
				stylecontent += "	.left-title		{$cp{diffColorer.sbs_left-title };padding: 5px; padding-top:0; padding-bottom:0; margin:0; overflow:auto; border: 1px solid black;}";
				stylecontent += "	.right-title	{$cp{diffColorer.sbs_right-title};padding: 5px; padding-top:0; padding-bottom:0; margin:0; overflow:auto; border: 1px solid black;}";
				stylecontent += "	.left .addline	{$cp{diffColorer.sbs_emptyLine	};width:100%; color: green; margin-right:5px;}";
				stylecontent += "	.right .delline	{$cp{diffColorer.sbs_emptyLine	};width:100%; color: green;}";

				return dom.createElement("style", null, pcp(stylecontent));
			}(),
			dom.createDocumentFragment(
				dom.createElement("pre", {id:'log', 'class':'log'}, il.log),
				il.files.map(function(file) {
						return dom.createElement(
							"table", {'class':'file-diff', title:file.name, id:file.name, width:"99%", align:"center"},
							dom.createElement(
								"tr", {'class':'title'},
								dom.createElement(
									"td", {colspan:2},
									dom.createElement(
										"pre", {'class':'title'},
										file.title
									)
								)
							),
							dom.createElement(
								"tr", {},
								dom.createElement(
									"td", {valign:'top', width:'50%'},
									dom.createElement(
										'pre', {'class':'left', style: 'padding:0'},
										dom.createElement('div', {'class':'delline', style: 'padding:5px'}, file.name))
								),
								dom.createElement(
									"td", {valign:'top', width:'50%'},
									dom.createElement(
										'pre', {'class':'right', style: 'padding:0'},
										dom.createElement('div', {'class':'addline', style: 'padding:5px'}, file.name))
								)
							),
							//precode,
							file.chunks.map(function(chunk) {
									function countLength(s) {
										if (s) {
											var offsetCorrector = 0;
											return s.replace("\t",
															 function(str, offset) {
																 var a = "".pad(colorediffsGlobal.tabWidth - (offset + offsetCorrector) % colorediffsGlobal.tabWidth);
																 offsetCorrector += colorediffsGlobal.tabWidth - (offset + offsetCorrector) % colorediffsGlobal.tabWidth - 1;
																 return a;
															 },
															 "g"
											).length;
										} else {
											return 0;
										}
									}

									var oldCodeDecorated = "";
									var newCodeDecorated = "";
									var oldLine = chunk['old'].line;
									var newLine = chunk['new'].line;

									var oldCode = chunk['old'].code;
									var newCode = chunk['new'].code;

									var oldRawCode = chunk['old'].raw_code;
									var newRawCode = chunk['new'].raw_code;

									var l = chunk['old'].code.length;

									for (var i=0; i < l; ++i) {
										var rawOldLineLength = countLength(oldRawCode[i]);
										var rawNewLineLength = countLength(newRawCode[i]);

										var maxLength = Math.max(rawOldLineLength, rawNewLineLength);

										var paddingOld = "".pad(maxLength - rawOldLineLength);
										var paddingNew = "".pad(maxLength - rawNewLineLength);

										var oldPaddedLine = ((oldCode[i])?oldCode[i]:"") + paddingOld;
										var newPaddedLine = ((newCode[i])?newCode[i]:"") + paddingNew;

										if (oldPaddedLine.length == 0) oldPaddedLine = " ";
										if (newPaddedLine.length == 0) newPaddedLine = " ";

										if ( oldCode[i] == null ) {
											oldCodeDecorated += "<div class='addline'>" + oldPaddedLine + "</div>";
											newCodeDecorated += "<div class='addline' title='" + file.name + ":" + newLine + "'>" + newPaddedLine + "</div>";
											newLine++;
										} else if ( newCode[i] == null ) {
											newCodeDecorated += "<div class='delline'>" + newPaddedLine + "</div>";
											oldCodeDecorated += "<div class='delline' title='" + file.name + ":" + oldLine + "'>" + oldPaddedLine + "</div>";
											oldLine++;
										} else {
											if ( oldCode[i] == newCode[i] ) {
												oldCodeDecorated += "<div class='steadyline' title='" + file.name + ":" + oldLine + "'>" + oldPaddedLine + "</div>";
												newCodeDecorated += "<div class='steadyline' title='" + file.name + ":" + newLine + "'>" + newPaddedLine + "</div>";
											} else {
												oldCodeDecorated += "<div class='delline' title='" + file.name + ":" + oldLine + "'>" + oldPaddedLine + "</div>";
												newCodeDecorated += "<div class='addline' title='" + file.name + ":" + newLine + "'>" + newPaddedLine + "</div>";
											}
											newLine++;
											oldLine++;
										}
									}

									return [
										dom.createElement(
											"tr", {'class':'linetag'},
											dom.createElement("td", {colspan:2},
															  "@@ -" + chunk['old'].line +
															  "," + colorediffsGlobal.ilUtils.calcLineCounts(chunk['old'].code) +
															  " +" +chunk['new'].line +
															  "," + colorediffsGlobal.ilUtils.calcLineCounts(chunk['new'].code) +
															  " @@")
										),
										dom.createElement(
											"tr", {'class':'diffs'},
											dom.createElement(
												"td", {valign:'top', width:'50%'},
												createCodeElement('left', oldCodeDecorated)
											),
											dom.createElement(
												"td", {valign:'top', width:'50%'},
												createCodeElement('right', newCodeDecorated)
											)
										)
									];
								}
							)
						);
					}
				)
			)
		];


//				//put precode
//				var left;
//				var right;

//				var string = file.precode;

//				string = string.replace(/^(\+{3}.*)$/mg, function(str, p1) {right = p1; return '';});
//				string = string.replace(/^(\-{3}.*)$/mg, function(str, p1) {left = p1; return '';});
//				string = string.replace(/\n+$/, '');

//				if (left && right) {
//					html += "<tr><td valign='top' width='50%' class='left-title'>" + left + "</td><td valign='top' class='right-title'>" + right + "</td></tr><tr><td colspan='2'><pre class='pre-code'>" + string + "</pre></td></tr>";
//				}

	},
	getPropertyPageId: function() {return "side-by-side-view-options";}
};