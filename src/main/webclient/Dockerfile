# syntax=docker/dockerfile:1

ARG NODE_VERSION=23.4.0

FROM node:${NODE_VERSION}-alpine as build

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app && chown node:node /usr/src/app
USER node 

# Copy and install dependencies
COPY package*.json ./
RUN yarn install --production --frozen-lockfile

# Copy application files and build the React app
COPY . .
RUN yarn build

# Stage 2: Setup the Nginx Server to serve the React Application
FROM nginx:1.25.0-alpine as production

# Create necessary directories and set permissions
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R nginx:nginx /var/cache/nginx

# Copy the build output to Nginx html directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
