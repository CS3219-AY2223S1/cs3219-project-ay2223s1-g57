kubectl delete deploy/chat-service
kubectl delete deploy/matching-service
kubectl delete deploy/mongodb
kubectl delete deploy/question-service
kubectl delete deploy/questionservicedb
kubectl delete deploy/user-service 
kubectl delete deploy/userservicedb

kubectl delete service/chat-service
kubectl delete service/matching-service
kubectl delete service/mongodb
kubectl delete service/question-service
kubectl delete service/questionservicedb
kubectl delete service/user-service 
kubectl delete service/userservicedb

kubectl delete hpa/chat-service-hpa
kubectl delete hpa/matching-service-hpa
kubectl delete hpa/user-service-hpa
kubectl delete hpa/question-service-hpa



