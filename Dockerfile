
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=https://lavoro-api.azure-api.net

ARG NEXT_PUBLIC_STREAM_API_KEY
ENV NEXT_PUBLIC_STREAM_API_KEY=${NEXT_PUBLIC_STREAM_API_KEY}

EXPOSE 3000
CMD ["npm", "start"]
