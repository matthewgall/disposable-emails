.PHONY: download
download:
	@echo Cleaning up public
	@rm -rf public/list.txt public/list.json

	@echo Building
	@./build.sh | uniq | sort > public/list.txt
	@./buildJSON.sh > public/list.json
