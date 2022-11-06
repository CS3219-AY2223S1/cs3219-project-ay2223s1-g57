kubectl apply -f manifests-v2/userservicedb-deployment.yaml
kubectl apply -f manifests-v2/userservicedb-service.yaml

kubectl apply -f manifests-v2/user-service-deployment.yaml
kubectl apply -f manifests-v2/user-service-service.yaml

kubectl apply -f manifests-v2/backend-ingress-controller.yaml 
kubectl apply -f manifests-v2/backend-ingress-object.yaml  

kubectl apply -f manifests-v2/questionservicedb-deployment.yaml
kubectl apply -f manifests-v2/questionservicedb-service.yaml

kubectl apply -f manifests-v2/question-service-deployment.yaml
kubectl apply -f manifests-v2/question-service-service.yaml

kubectl apply -f manifests-v2/mongodb-deployment.yaml
kubectl apply -f manifests-v2/mongodb-volume.yaml
kubectl apply -f manifests-v2/mongodb-service.yaml

kubectl apply -f manifests-v2/matching-service-deployment.yaml
kubectl apply -f manifests-v2/matching-service-service.yaml

kubectl apply -f manifests-v2/chat-service-deployment.yaml
kubectl apply -f manifests-v2/chat-service-service.yaml
kubectl apply -f manifests-v2/chat-service-hpa.yaml