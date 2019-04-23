FROM node:alpine

COPY . /home/node/backend
WORKDIR /home/node/backend
RUN yarn

CMD [ "yarn", "prod" ]