FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --network-timeout=600000 || npm install --network-timeout=600000

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev"]