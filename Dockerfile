FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
RUN yarn build

ENV NODE_ENV production

CMD [ "node", "dist/main.js" ]
