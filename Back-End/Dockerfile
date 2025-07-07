FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node" "dist/index.js" "npm", "run", "dev"]