FROM node:alpine

COPY . /home/node/backend
WORKDIR /home/node/backend
RUN apk add --no-cache git
RUN yarn

CMD [ "yarn", "prod" ]
