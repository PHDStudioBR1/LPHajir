#!/bin/bash
# Exemplo de como rodar o container com variáveis de ambiente para o formulário funcionar.
# Ajuste os valores e execute, ou use com docker-compose.
# Credenciais Web3Forms: quem usa drahaabdalla@gmail.com segue docs/MANUAL-CREDENCIAIS-EMAIL.md

docker run -d \
  --name lphajir-web \
  --restart always \
  -p 3000:3000 \
  -e NOTIFICATION_EMAIL="drahaabdalla@gmail.com" \
  -e CONTACT_FORM_KEY="SUA_ACCESS_KEY_WEB3FORMS" \
  -e CRM_BASE_URL="https://phdcrm.546digitalservices.com" \
  -e CRM_TENANT_SLUG="hajir" \
  -e CRM_USER_ID="1" \
  -e CRM_ADMIN_EMAIL="admin@hajir" \
  -e CRM_ADMIN_PASSWORD="SUA_SENHA_CRM" \
  --network drahajirabdalla_drahajirabdalla-network \
  donavanalencar/lphajir-web:latest
