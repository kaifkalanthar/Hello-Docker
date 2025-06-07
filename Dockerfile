FROM node:alpine
COPY . /script
WORKDIR /script
CMD node script.js