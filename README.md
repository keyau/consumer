## Description

Api Consumer is a sample of management credit account.

This api is based on CQRS and event sourcing architecture with [Nest](https://github.com/nestjs/nest) framework and [Eventstore](https://eventstore.com/) + [MongoDB](https://www.mongodb.com/fr) databases.

[![keyau](https://circleci.com/gh/keyau/consumer.svg?style=svg)](https://app.circleci.com/pipelines/github/keyau/consumer)

## Installation

```bash
# eventstore + mongodb + mongodb express
$ docker-compose up
# persistent subscription to eventstore 
$ ./scripts/init-subscription.sh

# api
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Urls

Swagger Api : http://localhost:3000/api/#/

Eventstore : http://localhost:2113/web/index.html#/ (login: admin / password : changeit)

MongoDb : http://localhost:8081/


## Kubernetes

### Minikube (configuration cpus=4, memoire=4000MB)
```bash
# Start minikube cluster (with VM hyperkit required for install ngnix controller for seq)
minikube start --vm=true
# Install addon ingress (required for install ngnix controller for seq)
minikube addons enable ingress (install ngnix controller for seq)
# Stop minikube
minikube stop
# Launch minikube tunnel for LoadBalancer pods
minikube tunnel
# Launch minikube dashboard or install Lens (https://k8slens.dev/) to manage cluster
minikube dashboard
# Delete minikube cluster
minikube delete
```

### Kubectl commands
```bash
# Vérification de l'installation
kubectl get pods -n kube-system
```

### Stack

Install Seq for logging (https://docs.datalust.co/docs/using-helm)
```bash
# Create kubernetes namespace for logging
kubectl create namespace logging
# Install
helm install -f kube/seq-config.yaml seq datalust/seq -n logging
# Update /etc/hosts locally to add ip and dns for seq ui and ingestion (https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/)
kubectl get ingress -n logging
sudo pico /etc/hosts
```
```bash
# /etc/hosts
192.168.64.6 seq.mydomain.com
192.168.64.6 ingestion.seq.mydomain.com
```

Update /etc/hosts in seq-gelf container for log ingestion ($SEQ_ADDRESS is set with internal dns http://seq.logging.svc.cluster.local:5341 but isn't resolve)
Documentation for ingestion : https://github.com/datalust/seqcli#ingest
```bash
# Install nano for edit file
apt-get update 
apt-get install nano
nano /etc/hosts
```
```bash
# /etc/hosts
172.0.0.1   localhost seq.logging.svc.cluster.local
```

Install fluent-bit for ingestion kubernetes logs (https://docs.datalust.co/docs/collecting-kubernetes-logs)
```bash
# Install deamonSet for Minikube (https://docs.fluentbit.io/manual/installation/kubernetes)
kubectl create -f https://raw.githubusercontent.com/fluent/fluent-bit-kubernetes-logging/master/fluent-bit-service-account.yaml
kubectl create -f https://raw.githubusercontent.com/fluent/fluent-bit-kubernetes-logging/master/fluent-bit-role.yaml
kubectl create -f https://raw.githubusercontent.com/fluent/fluent-bit-kubernetes-logging/master/fluent-bit-role-binding.yaml

kubectl apply -f kube/fluent-bit-config.yaml,kube/fluent-bit-daemon.yaml -n logging

(kubectl create -f https://raw.githubusercontent.com/fluent/fluent-bit-kubernetes-logging/master/output/elasticsearch/fluent-bit-configmap.yaml)
(kubectl create -f https://raw.githubusercontent.com/fluent/fluent-bit-kubernetes-logging/master/output/elasticsearch/fluent-bit-ds-minikube.yaml)
```

Install MongoDb Kubernetes Operator (https://github.com/mongodb/mongodb-kubernetes-operator)
```bash
# Create kubernetes namespace for mongodb
kubectl create namespace mongodb
# Download and install the operator
git clone https://github.com/mongodb/mongodb-kubernetes-operator.git
cd mongodb-kubernetes-operator
git checkout v0.0.7
kubectl create -f deploy/crds/mongodb.com_mongodb_crd.yaml
kubectl create -f deploy/ -n mongodb
# Ckeck installation
kubectl get all --namespace mongodb
# Create user password
kubectl create secret generic dev-mongodb-user-password -n mongodb --from-literal="password=password"
# Deploy replicat set
kubectl apply -f kube/mongodb.yaml -n mongodb
(kubectl apply -f deploy/crds/mongodb.com_v1_mongodb_cr.yaml --namespace mongodb)
# Ckeck installation
kubectl get mdb --namespace mongodb
```

Install mongo-express
```bash
kubectl apply -f kube/mongo-express-service.yaml,kube/mongo-express-deployment.yaml -n mongodb
```

Install eventstore
```bash
# Create kubernetes namespace for eventstore
kubectl create namespace eventstore
# Deploy eventstore cluster
kubectl apply -f kube/eventstore.yaml -n eventstore
# Deploy eventstore frontend (http://www.dinuzzo.co.uk/2018/08/13/set-up-an-eventstore-cluster-on-kubernetes/)
kubectl create configmap nginx-eventstore-frontend-conf -n eventstore --from-file=nginx-configmap.conf="nginx-configmap.conf"
kubectl apply -f kube/nginx-service.yaml,kube/nginx-deployment.yaml -n eventstore
```

### Application

Create image for api
```bash
# Build and tag image
docker image build --build-arg "app_name=consumer" . -t "consumer:latest" -t "consumer:0.0.1"
docker image tag consumer:latest keyau/consumer:latest     
# Push image on repository
docker login
docker push keyau/consumer:latest
```

Initialize database
```bash
# Create database consumer on primary cluster
mongo "mongodb://mongodb-cluster-0.mongodb-cluster-svc.mongodb.svc.cluster.local:27017/?replicaSet=mongodb-kubernetes-operator-64578584f9 --username root --password password --authenticationDatabase admin

> use consumer
> db.init.insert({"name":"test"})
> db.createUser({ user: 'defaultUser', pwd: 'password', roles: [ { role: 'readWrite', db: 'consumer' } ] })
```

Create persistent subscriptions on eventstore
```bash
curl -i -X PUT -d '{"startFrom": 0,"resolveLinktos": true}' http://eventstore-cluster.eventstore.svc.cluster.local:2113/subscriptions/%24ce-accounts/account -u admin:changeit -H "Content-Type: application/json"
curl -i -X PUT -d '{"startFrom": 0,"resolveLinktos": true}' http://eventstore-cluster.eventstore.svc.cluster.local:2113/subscriptions/%24ce-selections/selection -u admin:changeit -H "Content-Type: application/json"
```

Install api
```bash
# Create kubernetes namespace for consumer api
kubectl create namespace consumer
# Deploy api
kubectl apply -f kube/consumer-service.yaml,kube/consumer-deployment.yaml -n consumer
```
