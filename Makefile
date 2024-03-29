DATE := $(shell date +"%s")

.PHONY: download
download:
	@echo Cleaning up public
	@rm -rf public/list.txt public/list.json

	@echo Downloading jq
	@curl https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 -s -o jq
	@chmod +x jq

	@echo Downloading data to public/list.txt
	@./build.sh | sort | uniq > public/list.txt

	@echo Cleaning up data, and removing blocklisted domains
	@./cleanup.sh

	@echo Adding OpenAPI schema
	@cp openapi.yml public/openapi.yml

	@echo Converting public/list.txt to required formats
	@./buildJSON.sh > public/list.json
	@./buildYAML.sh > public/list.yaml

	@echo Updating version information
	@echo "{\"updated\":\"${DATE}\", \"sha\": \"${CF_PAGES_COMMIT_SHA}\"}" > public/version.json 
