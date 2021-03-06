# Docker and Kubernetes
My Workplay on docker

## Commands to remember : 

- `docker run` :- runs a command in a new container . `docker run = docker create + docker start`

- `docker run -p <localhostport>:<containerport> <imagename/id>` :- running on ports

- `docker ps` :- to list all the running containers

- `docker ps --all` :- list all the container ever created

- `docker system prune` :- to delete all the containers ever created along with some other properties

- `docker logs <container-id>` :- to get the logs

- `docker start` :- start stopped container

- `docker stop` :- stop the container - gets a sigterm message - terminate signal

- `docker kill` :- kills the container or stops the container instantly

- `docker exec -it <container id> <command>` :- Execute an additional command in container. `-it` makes us to provide the input. `-it equivalent to -i -t`

- `docker exec -it <container id> sh` :- provides access to the terminal inside the context of the container

- `docker build .` :- build an image from a Docker file

- `docker-compose up` :- aggregates the output of each container. Similar to docker run myimage

- `docker-compose up --build` :- similar to docker build and docker run. Rebuilds the container after making any changes to the file 

- `docker-compose up -d` :- starts the containers in the background and leaves them running

- `docker-compose down` :- stops the running containers at the same time

- `docker-compose ps` :- show the status of the containers

- `docker commit ` :- manual image generation

- `docker build -f <filename> .` :- to run a dockerfile with some different name

- `docker pull` :- pulls an image from registry

- `docker push` :- pushes an image to registry

- `docker search` :- search for an image in Docker Hub

- `docker history` :- shows the history of the image

- `docker info` :- shows system wide information

- `docker rm` :- remove one or more containers

- `docker rmi` :-remove one or more images

- `docker pause` :- pauses all processes within one or more containers

- `docker unpause` :- unpause all processes within one or more containers


# Kubernetes

* What is Kubernetes - System for running many different containers over multiple different machines

* Why Kubernetes - When you need to run many different containers with different images

## Local Setup 

* Install kubectl - cli to interact with master

* Install a VM driver virtual box - make VM which will be our single node

* Install minikube - runs a single node on that vm

* `kubectl` :- use for managing containers in the node

* `minikube` :- use for managing the VM itself (Local Only)

* `minikube start` :- to start the minikube

<!-- Table creation -->

<table style="width:100%">
	<tr>
		<th>Docker Compose</th>
		<th>Kubernetes </th>
	</tr>
	<tr>
		<td> Each entry can optionally get docker compose to build an image </td>
		<td> Kubernetes expects all images to already be built</td>
	</tr>
	<tr>
		<td> Each entry represents a container we want to create</td>
		<td> One config file per object we want to create</td>
	</tr>
	<tr>
		<td> Each entry defines the n/w requirements (Ports) </td>
		<td> We have to manually sets up all n/w</td>
	</tr>
</table>

## Note

Get a simple container running on our local K8s cluster running

- Make sure our image is hosted on docker hub

- Make one config file to create the container

- Make one config file to setup n/w 

>> Config file used to create Objects for example StatefulSet, ReplicaController, Pod, Service. Object will serve different functionalities like running container, monitoring a container, setting up nw etc.

- Pods :- Runs one or more closely related containers

- Services :- Sets up networking in K8S cluster. There are 4 subtypes

 - - ClusterIp

 - - NodePort : Exposes a container to the outside world and its only good for dev purposes

 - - LoadBalancer

 - - Ingress

- `kubectl apply -f <fileNamePath>` :- feed a config file to kubectl

- `kubectl get pods` :- prints the status of all running pods

- `kubectl get services` :- prints the status of all running services

- `minikube ip` :- to get the ip of the VM


<!-- Table creation -->

<table style="width:100%; align-content: center;">
	<tr>
		<th>Important Takeaways</th>
	</tr>
	<tr>
		<td>Kubernetes is a system to deploy containerized apps</td>
	</tr>
	<tr>
		<td>Nodes are individual machines or vm's that run containers</td>
	</tr>
	<tr>
		<td>Masters are machines or vm's with a set of programs to manage nodes</td>
	</tr>
	<tr>
		<td>Kubernetes didn't build our images - it got them from somewhere else</td>
	</tr>
	<tr>
		<td>Kubernetes (the master) decided  where to run each container - each node can run a dissimilar set of containers</td>
	</tr>
	<tr>
		<td>To deploy something, we update the desired state of the master with a config file</td>
	</tr>
	<tr>
		<td>The master works constantly to meet you desired state</td>
	</tr>
</table>

- `kubectl describe <ObjectType> <ObjectName>` :- describes the logs about the specified object type and name

<table style="width:100%; align-content: center;">
	<tr>
		<th>Limitations on Updating Config file</th>
	</tr>
	<tr>
		<td>Can only change spec.containers[*].image</td>
	</tr>
	<tr>
		<td>Can only change spec.initContainers[*].image</td>
	</tr>
	<tr>
		<td>Can only change spec.activeDeadlineSeconds</td>
	</tr>
	<tr>
		<td>Can only change spec.tolerations</td>
	</tr>
</table>

- Solution to this is by using Deployment Object type

### Difference between Pods and Deployment

<table style="width:100%; align-content: center;">
	<tr>
		<th>Pods</th>
		<th>Deployment</th>
	</tr>
	<tr>
		<td>Run a single set of containers that are very close</td>
		<td>Run a set of identical pods (one or more)</td>
	</tr>
	<tr>
		<td>Good for one-off dev purposes</td>
		<td>Monitors the state of each pod updating as necessary</td>
	</tr>
	<tr>
		<td>Rarely used directly in production</td>
		<td>Good for dev and production</td>
	</tr>
</table>

-
 `kubectl delete -f <configfile>` :- remove an object (like an imperative update)

- `kubectl get deployments` :- prints the status of the deployment

### Force pods to repull an image without changing the image tag issue#33664 kubernetes repo in github

- Manually delete pods to get the deployment to recreate them with the latest version but deleting pods manually seems silly(bad idea)

- Tag images with real version number and specify them in config file but it adds an extra step in the production deployment process(no friendly)

- Use an imperative command to update the image version the deployment must use also not the best solution we can say

- `kubectl set image <objectType> / <objectName> <containerName> = <newImageToUse>` :- Imperative command to update the image

### Configure your VM to use the docker server

* `eval $(minikube docker-env)` - this only configures your current terminal window ie this is not permanent and have to rerun the same command everytime if we close the terminal window

```bash
minikube docker-env 

#produces the following output
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://ip:2376"
export DOCKER_CERT_PATH="path"
export MINIKUBE_ACTIVE_DOCKERD="minikube"

# To point your shell to minikube's docker-daemon, run:
# eval $(minikube -p minikube docker-env)


```

#### Why mess with docker in node :( 

* Use all the same debugging techniques we learned with Docker CLI (Many of these are available through kubectl)

>> For example kubectl logs <name> or kubectl exec -t <name> sh to enable a shell etc.

* Manually kill containers to test Kubernetes self heal

* Delete cached images in the node (`docker system prune -a`)


### Path of introducing multicontainer project to K8s world

* Create config file for each service and deployment

* Test locally on minikube

* Setup github/travis flow to build images and deploy

* Deploy app to cloud provider

### ClusterIP vs NodePort

* ClusterIp exposes a set of pods to other objects inside the cluster and no outside world

* NodePort exposes a set of pods to the outside world and good for dev purposes only.

### Combine ClusterIP and Deployment yaml file

Here we need to give `---` 3 consecutive dashes to separate them

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: server-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      component: server
  template:
    metadata:
      labels:
        component: server
    spec:
      containers:
        - name: server
          image: imageName
          ports:
            - containerPort: 5000
---
apiVersion: v1
kind: Service
metadata:
  name: server-cluster-ip-service
spec:
  type: ClusterIP
  selector:
    component: server
  ports:
    - port: 5000
      targetPort: 5000

```

### Persistent Volume Claim (PVC in K8S world)

- When we have a pod with Postgres container or any other db container and if it crashes, then the pod will be deleted will be deployment

- When the new pod gets created with the postgres container, then there will be no data and all the previous data will be lost which is a big issue

- So we use **volume** to store these data which will be persistent and if our pod crashes, the data will not be lost as the volumes will be on the host machine

#### Volumes in K8S world (Don't get confused with docker volumes which is different with K8S volume)

- VOlume is an object that allows a container to store data at the pod level

- Volume resides inside a pod

- If a postgres container inside the pod gets failed, the container can restart and get back the data that are stored from the volume

- But if there occurs a case where the whole pod gets deleted, then the whole volume gets destroyed

- Even after the pod restarts or the deployment restarts, the data will be lost

### Volumes vs Persistent volume

- Data is stored at the pod level and data is lost when the pod crashes

- Data is stored outside the pod level and data is not lost when pod crashes or pod is deleted

### Persistent volume vs Persistent Volume Claim (PVC)

- Persistent Volume Claim is like advertisement options saying these much storage option is available

- So based on these advertisement like things, we write the config file and specify we need these much amount of storage and feed it into kubectl

- Now our salesperson which is the Kubernetes, looks into the statically provisioned persistent volume and see if it can meet the required storage which is requested.

- If it met that, then the storage is provided, other wise, the required storage will be made available by dynamically provisioned persistent volume

### Access Modes

- ReadWriteOnce:- can be used by a single node

- ReadOnlyMany:- multiple nodes can read from this

- ReadWriteMany:- can be read and written to by many nodes


- `kubectl get storageclass` :- tells about the storage class option available

- `kubectl describe storageclass` :- describes about the storage class

- `kubectl get pv` :- gets all the persistent volume

- `kubectl get pvc` :- gets all the persistent volume claim

### Secrets

* Securely stores a piece of information in the cluster such as a database password or any other sensitive information

* `kubectl create secret generic <secret_name> --from-literal key=value`

* `kubectl get secrets` - to get the list of created secrets

### LoadBalancer

* Legacy way of getting network traffic into a cluster

### Ingress

* Exposes a set of services to the outside world

* So we sets up config as Ingress routing rules to get traffic to services and feed to kubectl

* Then a controller for our ingress in created

* After that a pod running nginx that handles routing in generated

* `minikube addons enable ingress`

* `minikube dashboard` :- to open up the minikube dashboard in the default browser


### Some other commands

* `docker run -it -v $(pwd):/app ruby:2.4 sh` :- to start the ruby image  and start shell

* `gem install travis` :- installs the travis

* `travis login` :- to login to the travis account

* `travis encrypt-file service-account.json -r githubusername/repo` :- to encrypt the file

<!-- docker run -it -v $(pwd):/app ruby:2.4 sh        gem install travis -->