FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY ./lavoro-frontend/package.json /app/package.json
COPY ./lavoro-frontend/package-lock.json /app/package-lock.json
RUN npm install

FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./lavoro-frontend/node_modules
COPY ./lavoro-frontend .
