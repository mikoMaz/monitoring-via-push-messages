FROM node:latest

WORKDIR /react-app

COPY . .

RUN npm install yarn

RUN yarn install

#ENV PORT=3000
EXPOSE 3000

CMD ["yarn", "start"]
