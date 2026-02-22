# Comandos de Diagnóstico - Servidor

Execute estes comandos **no servidor** (SSH em srv1396535) e envie a saída para a IA analisar.

---

## 1. Containers Docker

```bash
docker ps -a
```

---

## 2. Logs do App (Next.js)

```bash
docker logs lphajir-web --tail=100
```

---

## 3. Logs do Nginx

```bash
docker logs drahajirabdalla-nginx --tail=50
```

---

## 4. Redes Docker

```bash
docker network ls
docker network inspect drahajirabdalla_drahajirabdalla-network
```

---

## 5. Variáveis de Ambiente do Container

```bash
docker exec lphajir-web env | grep -E "CRM|RESEND|NOTIFICATION"
```

---

## 6. Teste HTTP (deve falhar - porta fechada)

```bash
curl -v --max-time 5 http://drahajirabdalla.com.br 2>&1
```

---

## 7. Teste HTTPS (deve retornar 200)

```bash
curl -sI --max-time 10 https://drahajirabdalla.com.br 2>&1 | head -20
```

---

## 8. Teste CRM - Login

```bash
curl -s -w "\n\nHTTP_CODE:%{http_code}" --max-time 20 \
  -X POST 'https://phdcrm.546digitalservices.com/api/crm/v1/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@hajir","password":"admin123","tenant_slug":"hajir"}' 2>&1
```

---

## 9. Teste Local (do servidor para o app)

```bash
curl -sI http://127.0.0.1:3000 2>&1 | head -10
```

---

## 10. Configuração Nginx

```bash
docker exec drahajirabdalla-nginx cat /etc/nginx/conf.d/drahajirabdalla.com.br.conf
```

---

## 11. Certificados SSL

```bash
ls -la /home/ubuntu/drahajirabdalla.com.br/ssl/
```

---

## 12. Script de Testes Automatizado

```bash
cd /root/LPHajir && ./scripts/test-apis.sh 2>&1
```

---

## 13. Portas em Uso

```bash
ss -tlnp | grep -E ':80|:443|:3000'
```

---

## Copiar tudo de uma vez

```bash
{
  echo "=== 1. CONTAINERS ==="
  docker ps -a
  echo ""
  echo "=== 2. LOGS APP ==="
  docker logs lphajir-web --tail=100 2>&1
  echo ""
  echo "=== 3. LOGS NGINX ==="
  docker logs drahajirabdalla-nginx --tail=50 2>&1
  echo ""
  echo "=== 4. ENV VARS ==="
  docker exec lphajir-web env | grep -E "CRM|RESEND|NOTIFICATION" 2>&1
  echo ""
  echo "=== 5. TESTE HTTPS ==="
  curl -sI --max-time 10 https://drahajirabdalla.com.br 2>&1 | head -15
  echo ""
  echo "=== 6. TESTE CRM ==="
  curl -s -w "\nHTTP:%{http_code}" --max-time 20 -X POST 'https://phdcrm.546digitalservices.com/api/crm/v1/auth/login' -H 'Content-Type: application/json' -d '{"email":"admin@hajir","password":"admin123","tenant_slug":"hajir"}' 2>&1
  echo ""
  echo "=== 7. TESTE LOCALHOST ==="
  curl -sI http://127.0.0.1:3000 2>&1 | head -5
} 2>&1
```

Copie a saída completa e envie para a IA.
