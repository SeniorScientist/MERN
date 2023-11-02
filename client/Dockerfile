# build environment
FROM node:20.9.0 as build

ARG NODE_ENV_ARG
ARG MONGO_URI_ARG
ARG PORT
ARG HOST
ARG SESSION_KEY
ENV NODE_ENV=$NODE_ENV_ARG
ENV MONGO_URI=$MONGO_URI_ARG
ENV PORT=$PORT_ARG
ENV HOST=$HOST_ARG
ENV SESSION_KEY=$SESSION_KEY_ARG

WORKDIR /app

ENV PATH="./node_modules/.bin:$PATH"
COPY package.json ./
RUN yarn install

COPY . .
RUN yarn build

# production environment, nginx serving static files from build directory
FROM nginx:1.21.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
