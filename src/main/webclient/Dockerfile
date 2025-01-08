# syntax=docker/dockerfile:1

ARG NODE_VERSION=23.4.0

FROM node:${NODE_VERSION}-alpine as build

USER node 
WORKDIR /usr/src/app

RUN chown node:node ./

# Copy and install dependencies
COPY package*.json .
RUN yarn install --production --frozen-lockfile

# Copy application files and build the React app
COPY . .
RUN yarn build

# Stage 2: Setup the Nginx Server to serve the React Application
FROM nginx:1.25.0-alpine as production

# Copy the build output to Nginx html directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificates
COPY ./certs /etc/nginx/certs

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
