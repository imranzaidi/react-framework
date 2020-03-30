FROM node:12.16.1-buster

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV NODE_ENV "production"

RUN npm run lint && npm run test && npm run build

EXPOSE 3090

CMD ["npm", "run", "start"]
