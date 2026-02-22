#!/bin/bash
# Coleta todos os diagnósticos para enviar à IA
# Uso: ./scripts/coletar-diagnostico.sh

echo "=============================================="
echo "  DIAGNÓSTICO COMPLETO - Envie esta saída à IA"
echo "=============================================="
echo ""

echo "=== 1. CONTAINERS DOCKER ==="
docker ps -a 2>&1
echo ""

echo "=== 2. LOGS DO APP (últimas 80 linhas) ==="
docker logs lphajir-web --tail=80 2>&1
echo ""

echo "=== 3. LOGS DO NGINX (últimas 30 linhas) ==="
docker logs drahajirabdalla-nginx --tail=30 2>&1
echo ""

echo "=== 4. VARIÁVEIS DE AMBIENTE (CRM, Resend) ==="
docker exec lphajir-web env 2>/dev/null | grep -E "CRM|RESEND|NOTIFICATION" || echo "(nenhuma ou container parado)"
echo ""

echo "=== 5. REDES DOCKER ==="
docker network ls 2>&1
echo ""

echo "=== 6. TESTE HTTP (deve falhar) ==="
curl -v --max-time 5 http://drahajirabdalla.com.br 2>&1 || true
echo ""

echo "=== 7. TESTE HTTPS (deve retornar 200) ==="
curl -sI --max-time 10 https://drahajirabdalla.com.br 2>&1 | head -15
echo ""

echo "=== 8. TESTE CRM - LOGIN ==="
curl -s -w "\n--- HTTP_CODE:%{http_code} ---" --max-time 25 \
  -X POST 'https://phdcrm.546digitalservices.com/api/crm/v1/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@hajir","password":"admin123","tenant_slug":"hajir"}' 2>&1
echo ""
echo ""

echo "=== 9. TESTE LOCALHOST:3000 ==="
curl -sI --max-time 5 http://127.0.0.1:3000 2>&1 | head -8
echo ""

echo "=== 10. PORTAS EM USO ==="
ss -tlnp 2>/dev/null | grep -E ':80|:443|:3000' || netstat -tlnp 2>/dev/null | grep -E ':80|:443|:3000' || echo "ss/netstat não disponível"
echo ""

echo "=== 11. NGINX CONFIG ==="
docker exec drahajirabdalla-nginx cat /etc/nginx/conf.d/drahajirabdalla.com.br.conf 2>&1
echo ""

echo "=== 12. CERTIFICADOS SSL ==="
ls -la /home/ubuntu/drahajirabdalla.com.br/ssl/ 2>&1
echo ""

echo "=============================================="
echo "  FIM - Copie TUDO acima e envie à IA"
echo "=============================================="
