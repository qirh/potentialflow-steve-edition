FROM node:14.19.3

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]
