FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /srv
COPY ["build/", "build/"]
COPY ["node_modules/", "node_modules/"]
USER node
expose 8080
CMD ["node", "build/index.js"]
