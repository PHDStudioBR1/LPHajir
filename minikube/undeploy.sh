#!/usr/bin/env bash
set -e

# Remove o deploy LPHajir do Minikube e encerra port-forwards
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=== Removendo LPHajir do Minikube ==="
pkill -f "port-forward.*ingress-nginx-controller" 2>/dev/null || true
kubectl delete -f "$SCRIPT_DIR/ingress.yaml" --ignore-not-found
kubectl delete -f "$SCRIPT_DIR/deployment.yaml" --ignore-not-found
kubectl delete -f "$SCRIPT_DIR/contact-config.yaml" --ignore-not-found
kubectl delete -f "$SCRIPT_DIR/secrets.yaml" --ignore-not-found
kubectl delete -f "$SCRIPT_DIR/namespace.yaml" --ignore-not-found
echo "Recursos removidos."
