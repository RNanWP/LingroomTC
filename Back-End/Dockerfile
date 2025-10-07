# Build
FROM node:20-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm prune --production

# Produção
FROM node:20-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/public ./public

EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "dist/server.js" ]
# CMD ["npm", "start", "run", "dev", "dist/server.js"]
# CMD ["npm", "start"]
# CMD [ "ls", "-R" ]