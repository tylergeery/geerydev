container_mongodb=gd-mongodb
container_node=gd-node

image_mongodb=mongo
image_mongodb_dev=gd-image-mongodb-dev
image_node=tylergeery/gd-image-node
image_node_dev=gd-image-node-dev

network_name=geerydev

build_path=.
image_path=./infra/docker


.PHONY: help dev test
.DEFAULT_GOAL := help

dev: dev-setup dev-provision ## Get a dev docker environment up and running

dev-setup:
	docker network create $(network_name)
	docker run --network $(network_name) -p 27017 -v $(shell pwd)/data:/dump --name $(container_mongodb) -d $(image_mongodb_dev)
	docker run --network $(network_name) -p 8000:8080 -v $(shell pwd)/server:/usr/src/app --name $(container_node) -d $(image_node_dev)

dev-provision:
	# TODO: get this working
	# docker exec -it $(container_mongodb) sh -c "mongorestore --uri=mongodb://geerydev:password@gd-mongodb:27017/geerydev?authSource=admin&gssapiServiceName=mongodb /dump"

dev-images: ## Build local docker images
	docker build -f $(image_path)/mongodb/Dockerfile -t $(image_mongodb_dev) $(build_path)
	docker build -f $(image_path)/node/Dockerfile --target dev -t $(image_node_dev) $(build_path)

dev-rm: ## Tear down local dev env
	-docker kill $(container_node) $(container_mongodb)
	-docker rm $(container_node) $(container_mongodb)
	docker network rm $(network_name)

dev-clean: ## Delete local docker images
	docker rmi $(image_node_dev) $(image_mongodb_dev)

prod-images:
	docker build -f $(image_path)/node/Dockerfile --target prod -t $(image_node) $(build_path)
	docker push $(image_node)

deploy: prod-images ## Deploy application
	docker run --network prod -p 27017 --name $(container_mongodb) -d $(image_mongodb)
	docker run --network prod -p 8080 --name $(container_node) -d $(image_node)

test: ## Run app tests
	docker exec -it $(container_node) npm run test

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
