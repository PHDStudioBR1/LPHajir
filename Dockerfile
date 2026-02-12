FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

# Instala somente dependências necessárias (usa package-lock se existir)
RUN npm ci || npm install

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia apenas o necessário para rodar o Next em produção
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["npm", "run", "start"]

