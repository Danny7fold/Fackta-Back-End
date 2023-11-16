From node:18-alpine

ENV NODE_ENV development

Run npm install -g nodemon

WORKDIR /usr/src/app

COPY package.json .

Run npm install 

COPY . .



EXPOSE 8080

CMD [ "npm", "run", "dev" ]



