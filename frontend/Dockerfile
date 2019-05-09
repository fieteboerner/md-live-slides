FROM node:alpine

COPY . /home/node/frontend
WORKDIR /home/node/frontend
RUN apk add --no-cache git
RUN yarn
RUN yarn build

CMD [ "yarn", "prod" ]
