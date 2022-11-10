kubectl apply -f manifests-v2/userservicedb-deployment.yaml
kubectl apply -f manifests-v2/userservicedb-service.yaml

kubectl apply -f manifests-v2/questionservicedb-deployment.yaml
kubectl apply -f manifests-v2/questionservicedb-service.yaml

kubectl apply -f manifests-v2/mongodb-deployment.yaml
kubectl apply -f manifests-v2/mongodb-volume.yaml
kubectl apply -f manifests-v2/mongodb-service.yaml

kubectl apply -f manifests-v2/backend-ingress-controller.yaml 
