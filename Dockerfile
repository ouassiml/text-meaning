FROM node:lts-alpine
WORKDIR /opt/app
COPY package.json .
RUN npm install --only=production
COPY --chown=node:node . .
USER node
CMD ["npm", "run", "start"]