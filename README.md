# Docker
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
