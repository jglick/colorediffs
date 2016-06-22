ADDON=colorediffs
XPI=$(ADDON)-$(shell date -u "+%Y%m%d").xpi
SRC=$(shell find chrome defaults)
TOPFILES=install.rdf chrome.manifest LICENSE

.PHONY: clean test

xpi: $(XPI)

%.xpi: $(SRC) $(TOPFILES)
	@zip -q -r $@ $^

test:
	@echo 'Wait, it does not work! :('
	@#java -cp test-framework/js.jar org.mozilla.javascript.tools.shell.Main \
		#-version 170 \
		#-debug test-framework/main.js \
		#--test-directory chrome/content/tests/

clean:
	@rm -f $(ADDON)-*T*.xpi