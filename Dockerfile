FROM node:latest
WORKDIR /opt/app
RUN apt-get --upgrade
RUN apt-get npm
COPY package.json .
RUN npm install
COPY . .
CMD ["node","index.js"]