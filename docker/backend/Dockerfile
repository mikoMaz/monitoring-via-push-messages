FROM node:23.4.0-alpine AS frontend-build
WORKDIR /app
COPY src/main/webclient/package.json src/main/webclient/yarn.lock ./src/main/webclient/
RUN cd src/main/webclient && yarn install --production --frozen-lockfile
COPY src/main/webclient ./src/main/webclient
RUN cd src/main/webclient && yarn build

FROM maven:3.9.5-amazoncorretto-21 AS backend-build
WORKDIR /app
COPY pom.xml .
COPY src ./src
COPY --from=frontend-build /app/src/main/webclient/build ./src/main/resources/static
RUN mvn package -Dmaven.test.skip=true

FROM amazoncorretto:21
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Dserver.port=$PORT", "-jar", "/app.jar"]