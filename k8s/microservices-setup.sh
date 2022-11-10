kubectl apply -f manifests-v2/user-service-deployment.yaml
kubectl apply -f manifests-v2/user-service-service.yaml
kubectl apply -f manifests-v2/user-service-hpa.yaml

kubectl apply -f manifests-v2/question-service-deployment.yaml
kubectl apply -f manifests-v2/question-service-service.yaml
kubectl apply -f manifests-v2/question-service-hpa.yaml

kubectl apply -f manifests-v2/matching-service-deployment.yaml
kubectl apply -f manifests-v2/matching-service-service.yaml
kubectl apply -f manifests-v2/matching-service-hpa.yaml

kubectl apply -f manifests-v2/chat-service-deployment.yaml
kubectl apply -f manifests-v2/chat-service-service.yaml
kubectl apply -f manifests-v2/chat-service-hpa.yaml

kubectl apply -f manifests-v2/backend-ingress-object.yaml  
