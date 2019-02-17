FROM node:dubnium-alpine as production-dependencies
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production

FROM node:dubnium-alpine as build-dependencies
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

FROM node:dubnium-alpine as tester
WORKDIR /app
COPY --from=build-dependencies /app/node_modules node_modules
COPY . .
RUN npm run -s test

FROM node:dubnium-alpine as builder
WORKDIR /app
COPY --from=build-dependencies /app/node_modules node_modules
COPY . .
RUN npm run build

FROM node:dubnium-alpine
WORKDIR /app
COPY --from=production-dependencies /app .
COPY --from=builder /app/next.config.js next.config.js
COPY --from=builder /app/.next .next
EXPOSE 3000
CMD [ "npm", "start" ]
