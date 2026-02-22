#!/bin/bash
# Testes de APIs e conectividade
# Uso: ./scripts/test-apis.sh

set -e
CRM_BASE="${CRM_BASE_URL:-https://phdcrm.546digitalservices.com}"
CRM_API="${CRM_BASE}/api/crm/v1"
CRM_EMAIL="${CRM_ADMIN_EMAIL:-admin@hajir}"
CRM_PASS="${CRM_ADMIN_PASSWORD:-admin123}"
TENANT="${CRM_TENANT_SLUG:-hajir}"
SITE="https://drahajirabdalla.com.br"

echo "=========================================="
echo "  TESTES DE API E CONECTIVIDADE"
echo "=========================================="
echo ""

# 1. HTTP fechado
echo "1. HTTP (porta 80) - deve falhar/Connection reset"
if curl -sI --max-time 5 http://drahajirabdalla.com.br 2>/dev/null; then
    echo "   [AVISO] HTTP retornou resposta - porta deveria estar fechada"
else
    echo "   [OK] HTTP fechado (conexão recusada/reset)"
fi
echo ""

# 2. HTTPS funcionando
echo "2. HTTPS - deve retornar 200"
CODE=$(curl -sI -o /dev/null -w "%{http_code}" --max-time 10 "$SITE" -k 2>/dev/null || echo "000")
if [ "$CODE" = "200" ]; then
    echo "   [OK] HTTPS retornou $CODE"
else
    echo "   [FALHA] HTTPS retornou: $CODE"
fi
echo ""

# 3. CRM Login
echo "3. CRM - Login"
LOGIN_RESP=$(curl -s -w "\n%{http_code}" --max-time 15 -X POST "$CRM_API/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$CRM_EMAIL\",\"password\":\"$CRM_PASS\",\"tenant_slug\":\"$TENANT\"}" 2>/dev/null || echo -e "\n000")
HTTP_CODE=$(echo "$LOGIN_RESP" | tail -1)
BODY=$(echo "$LOGIN_RESP" | sed '$d')
if [ "$HTTP_CODE" = "200" ]; then
    TOKEN=$(echo "$BODY" | grep -o '"accessToken":"[^"]*"' | head -1 | cut -d'"' -f4)
    if [ -n "$TOKEN" ]; then
        echo "   [OK] Login OK, token obtido"
    else
        echo "   [AVISO] Login 200 mas sem data.accessToken"
    fi
else
    echo "   [FALHA/SLOW] HTTP $HTTP_CODE - CRM pode estar lento ou inacessível"
fi
echo ""

# 4. Resend (não dá para testar sem chave)
echo "4. Resend - não testado (requer API key no servidor)"
echo ""

echo "=========================================="
echo "  FIM DOS TESTES"
echo "=========================================="
