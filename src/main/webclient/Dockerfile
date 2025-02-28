FROM node:23.4.0-alpine AS build
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app && chown node:node /usr/src/app
USER node
COPY package*.json ./
RUN yarn install --production --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:1.25.0-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
