# Build Stage
FROM node:20-alpine AS BUILD_IMAGE
WORKDIR /app
COPY ./lavoro-frontend/package*.json ./
RUN npm install
COPY ./lavoro-frontend .
RUN npm run build


# Production Stage
FROM node:20-alpine AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next 
COPY --from=BUILD_IMAGE /app/public ./public 
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npx", "next", "start"]