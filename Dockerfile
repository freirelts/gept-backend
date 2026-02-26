FROM node:16

WORKDIR /app

COPY . .

RUN npm install

ENV NODE_ENV=production

RUN npm run build

EXPOSE 4000

CMD [ "node", "dist/server.js" ]


