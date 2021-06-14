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
	<tr>
		<td>Can only change spec.tolerations</td>
	</tr>
</table>