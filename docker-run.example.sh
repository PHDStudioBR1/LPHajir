#!/bin/bash
# Exemplo de como rodar o container com variáveis de ambiente para o formulário funcionar.
# Ajuste os valores e execute, ou use com docker-compose.

docker run -d \
  --name lphajir-web \
  --restart always \
  -p 3000:3000 \
  -e NOTIFICATION_EMAIL="donavan.alencar@gmail.com" \
  -e CRM_BASE_URL="https://phdcrm.546digitalservices.com" \
  -e CRM_TENANT_SLUG="hajir" \
  -e CRM_USER_ID="1" \
  -e CRM_ADMIN_EMAIL="admin@hajir" \
  -e CRM_ADMIN_PASSWORD="SUA_SENHA_CRM" \
  -e RESEND_API_KEY="re_SUA_CHAVE_RESEND" \
  -e RESEND_FROM_EMAIL="Dra. Hajir <onboarding@resend.dev>" \
  --network drahajirabdalla_drahajirabdalla-network \
  donavanalencar/lphajir-web:latest
