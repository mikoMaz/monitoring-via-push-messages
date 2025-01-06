# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=23.4.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.


USER node 
WORKDIR /usr/src/app

RUN chown node:node ./
RUN echo $(ls -la)
#USER node
#RUN mkdir -p usr/src/app && chown node:node usr/src/app
#RUN ls -la
#COPY --chown=node:node package.json .
#COPY --chown=node:node yarn.lock .
#RUN mkdir -p /cache
#RUN yarn config set cache-folder /cache

#&& chown -R node:node /usr/src/app.npm

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --production --frozen-lockfile

# Run the application as a non-root user.
RUN echo $(ls -la)
# Copy the rest of the source files into the image.
COPY --chown=node:node . /usr/src/app
RUN echo $(ls -la)
RUN echo $(whoami)
# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.


CMD react-scripts start
