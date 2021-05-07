# Use an existing docker image as a base
FROM alpine


# Download and install the dependency
RUN apk add --update redis


# Tell the image what to do when it starts as a container
CMD ["redis-server"]