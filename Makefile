.PHONY: download
download:
	@echo Cleaning up public
	@rm -rf public/list.txt public/list.json

	@echo Downloading data to public/list.txt
	@./build.sh | sort | uniq > public/list.txt

	@echo Converting public/list.txt to required formats
	@./buildJSON.sh > public/list.json
	@./buildYAML.sh > public/list.yaml