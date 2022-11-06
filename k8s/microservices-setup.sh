kubectl apply -f manifests-v2/userservicedb-deployment.yaml
kubectl apply -f manifests-v2/userservicedb-service.yaml

kubectl apply -f manifests-v2/user-service-deployment.yaml
kubectl apply -f manifests-v2/user-service-service.yaml

kubectl apply -f manifests-v2/backend-ingress-controller.yaml 
kubectl apply -f manifests-v2/backend-ingress-object.yaml  