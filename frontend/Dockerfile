FROM node:alpine

COPY . /home/node/frontend
WORKDIR /home/node/frontend
RUN yarn
RUN yarn build

CMD [ "yarn", "prod" ]