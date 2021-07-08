FROM node:latest
WORKDIR /opt/app
RUN apt-get --upgrade
RUN apt-get npm
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "build", "&&", "node", "dist/index.js"]