# Use an existing docker image as a base
FROM alpine


# Download and install the dependency
RUN apk add --update redis
RUN apk add --update gcc

# if we reorder the RUN command and move gcc before redis, then the cache will not be used again


# Tell the image what to do when it starts as a container
CMD ["redis-server"]

# Why alpine - it comes with preinstalled programs that are very useful