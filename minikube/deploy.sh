#!/usr/bin/env bash
set -e

# Deploy LPHajir no Minikube local
# Faz: build da imagem -> push -> apply manifestos -> rollout
# Uso: ./deploy.sh [porta_local]
# Exemplo: ./deploy.sh      -> http://localhost:80
#          ./deploy.sh 8080 -> http://localhost:8080 (use se a porta 80 estiver em uso)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
NAMESPACE="lphajir"
IMAGE_NAME="${IMAGE_NAME:-donavanalencar/lphajir-web:latest}"
LOCAL_PORT="${1:-80}"

echo "=== LPHajir - Deploy no Minikube ==="

# 1. Verificar se o minikube está rodando
if ! minikube status &>/dev/null; then
  echo "Minikube não está rodando. Iniciando..."
  minikube start
fi

# 2. Build da imagem (com alterações do projeto)
echo "Fazendo build da imagem em $REPO_ROOT..."
docker build -t "$IMAGE_NAME" "$REPO_ROOT"

# 3. Push para o registry (para o cluster poder fazer pull após rollout)
echo "Fazendo push da imagem $IMAGE_NAME..."
docker push "$IMAGE_NAME"

# 4. Usar Traefik como ingress (não habilitar addon nginx)
echo "Usando Traefik como ingress controller..."
minikube addons disable ingress 2>/dev/null || true

# 5. Aplicar manifestos na ordem
echo "Aplicando manifestos em $SCRIPT_DIR..."
kubectl apply -f "$SCRIPT_DIR/namespace.yaml"
kubectl apply -f "$SCRIPT_DIR/secrets.yaml"
kubectl apply -f "$SCRIPT_DIR/deployment.yaml"
kubectl apply -f "$SCRIPT_DIR/ingress.yaml"

# 6. Rollout para usar a nova imagem (pull e reiniciar pods)
echo "Reiniciando deployment para usar a nova imagem..."
kubectl rollout restart deployment/lphajir-frontend -n "$NAMESPACE"

# 7. Aguardar deployment ficar pronto
echo "Aguardando pods ficarem prontos..."
kubectl rollout status deployment/lphajir-frontend -n "$NAMESPACE" --timeout=120s

# 8. Aguardar Traefik (para o ingress funcionar)
echo "Aguardando Traefik..."
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=traefik -n traefik --timeout=60s 2>/dev/null || true

# 9. Port-forward para localhost (porta 80 = Ingress/Traefik)
echo "Iniciando port-forward para localhost:$LOCAL_PORT ..."
pkill -f "port-forward.*traefik.*$LOCAL_PORT" 2>/dev/null || true
pkill -f "port-forward.*lphajir-web-service.*$LOCAL_PORT" 2>/dev/null || true
sleep 1

if kubectl get svc -n traefik traefik &>/dev/null; then
  kubectl port-forward -n traefik service/traefik "$LOCAL_PORT:80" &
else
  # Fallback: port-forward direto no service da aplicação (sem ingress)
  echo "Traefik não encontrado; usando port-forward direto no service da aplicação."
  kubectl port-forward -n "$NAMESPACE" service/lphajir-web-service "$LOCAL_PORT:80" &
fi
PF_PID=$!
# Deixar port-forward estabilizar
sleep 3

echo ""
echo "=============================================="
echo "  Deploy concluído."
echo "  Acesse a aplicação em:"
echo "  http://localhost:$LOCAL_PORT"
echo "=============================================="
echo ""
if [[ "$LOCAL_PORT" == "80" ]]; then
  echo "Se a porta 80 falhar (em uso ou permissão), execute: ./deploy.sh 8080"
  echo ""
fi
echo "Para parar o port-forward: kill $PF_PID"
echo "Para remover os recursos: kubectl delete -f $SCRIPT_DIR/"
echo ""

# Manter o script rodando com port-forward ativo (Ctrl+C encerra o port-forward)
wait $PF_PID
