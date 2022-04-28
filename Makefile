.PHONY: download
download:
	@echo Cleaning up public
	@rm -rf public/list.txt

	@echo Building
	@./build.sh | uniq | sort > public/list.txt
