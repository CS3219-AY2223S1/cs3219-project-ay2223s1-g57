# pre-requisites: run k8s-ms-docker-build.sh from root directory to create all docker images
# this file loads all the images to the kind cluster
kind load docker-image user-service --name kind-1
kind load docker-image question-service --name kind-1
kind load docker-image matching-service --name kind-1
kind load docker-image chat-service --name kind-1