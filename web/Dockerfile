# This Dockerfile builds the React front end for nginx
# It also proxies /api requests to api:5000

# Build step #1: build the React front end
FROM node:14-alpine as build-step
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Build step #2: build an nginx container
FROM nginx:stable-alpine
COPY --from=build-step /usr/src/app/build /usr/share/nginx/html
COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf
