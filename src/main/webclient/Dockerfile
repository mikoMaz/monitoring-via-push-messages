FROM node:latest

WORKDIR /react-app

COPY . .

RUN npm install yarn

RUN yarn install

#ENV PORT=2137
EXPOSE 2137

CMD ["yarn", "start"]
