# base image specify

FROM node:alpine

WORKDIR /media/vazha/softwares/Github/Docker/NodeJsWebApp

# node:alpine version means very small version

# Install deps
COPY ./ ./
RUN npm install

# default command

CMD ["npm", "start"]