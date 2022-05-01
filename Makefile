.PHONY: download
download:
	@echo Cleaning up public
	@rm -rf public/list.txt public/list.json

	@echo Downloading data to public/list.txt
	@./build.sh | uniq | sort > public/list.txt

	@echo Converting public/list.txt to required formats
	@./buildJSON.sh > public/list.json
