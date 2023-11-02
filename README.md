# :rocket: MERN home assessment with table, signup, hooks and docker (prod/dev).

![capture](https://github.com/SeniorScientist/MERN/blob/main/Screenshot%202023-11-02%20100324.png?raw=true)

## :star: The project if it helped you!

# :whale: Docker

Boilerplate now is fully usable with docker, it integrate the MongoDB database, the React/Redux frontend and NodeJS/Express backend.

If you do not have docker: <https://docs.docker.com/get-docker/>

Docker allows to deloy the app in docker containers in one line in the CLI.

## Environment variables

You have to set the following environment variables in `server.dev.env` file (rename server.example.env to server.dev.env):

- SESSION_KEY, it is the secret key that is used to compute the hash of sessions. It is important to use a strong key: <https://cloud.google.com/network-connectivity/docs/vpn/how-to/generating-pre-shared-key>.

## Development

in the root directory:

`docker compose up --build`

It supports hot reloading for both the frontend and backend.

## Production

Set `server.prod.env` and `client.prod.env` files.

Note: `server.prod.env` is used at runtime and can be defined in docker-compose directly, `client.prod.env` is used at docker image build time, to do so we define env for the docker-compose parser through `--env-file` then pass the envs to docker build through arguments.

in the root directory:

`docker compose -f docker-compose.prod.yml --env-file client.prod.env up --build`

To deploy on Heroku refer to their documentation:
<https://devcenter.heroku.com/categories/deploying-with-docker>

## :computer: Boilerplate

MERN Stack with advanced authentication :

- Chakra UI for front-end UI.

- NGINX for client proxy

- Server side sessions.

- Docker for development and production with hot reloading.

- Mongodb.

- Express.

- React/Zustand based on Create React App.

- React Hooks.

- Nodejs.

- Typescript.

- Passport-js local.

## :lock: Security

This repository is scanned with snyk and code scanning from github for vulnerabilities. Do not use this code blindly, audit it first.
