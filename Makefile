container_mongodb=gd-mongodb
container_node=gd-node

image_mongodb=mongo
image_node=gd-image-node
image_node_dev=gd-image-node-dev

network_name=geerydev

build_path=.
image_path=./infra/docker


.PHONY: help dev test
.DEFAULT_GOAL := help

dev: ## Get a dev docker environment up and running
	docker network create $(network_name)
	docker run --network -p 27017 --name $(container_mongodb) -d $(image_mongodb)
	docker run -p 8000:8080 --name $(container_node) -d $(image_node_dev)

dev-images: ## Build local docker images
	docker build -f $(image_path)/node/Dockerfile --target dev -t $(image_node_dev) $(build_path)

dev-rm: ## Tear down local dev env
	-docker kill $(container_node) $(container_mongodb)
	-docker rm $(container_node) $(container_mongodb)
	docker network rm $(network_name)

dev-clean: ## Delete local docker images
	docker rmi $(container_mongodb) $(container_node)

prod-images:
	docker build -f $(image_path)/node/Dockerfile --target prod -t $(image_node) $(build_path)

deploy: ## Deploy application
	echo 'TODO'

test: ## Run app tests
	docker exec -it $(container_node) npm run test

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
