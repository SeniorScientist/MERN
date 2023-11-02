# Create image based on node alpine
FROM node:20.9.0

ARG NODE_ENV_ARG
ARG API_URL_ARG
ARG NODE_PATH
ENV NODE_ENV=$NODE_ENV_ARG
ENV API_URL=$API_URL_ARG
ENV NODE_PATH=$NODE_PATH


# Change directory so that our commands run inside this new directory
WORKDIR /app
# Copy dependency definitions
COPY package.json ./
# Install dependecies 
RUN yarn install --immutable
# Get all the code needed to run the app
COPY . .
# Build app
RUN yarn build
# Expose the port the app runs in
EXPOSE 8081
# Serve the app
CMD ["yarn", "start"]