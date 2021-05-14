# base image specify

FROM node:alpine

WORKDIR /usr/app

# node:alpine version means very small version

# Install deps
COPY ./package.json ./
RUN npm install
COPY ./ ./

# default command

CMD ["npm", "start"]