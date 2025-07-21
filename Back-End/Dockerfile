# Build
FROM node:20-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# RUN npm prune --production

# Produção
FROM node:20-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production


COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

# Comando para iniciar a aplicação
# CMD ["npm", "start", "run", "dev", "dist/server.js"]
# CMD ["npm", "start"]
CMD [ "ls", "-R" ]