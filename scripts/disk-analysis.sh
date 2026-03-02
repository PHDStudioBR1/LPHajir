#!/usr/bin/env bash
# Análise de uso de disco - executar no servidor (ex.: via SSH ou local)
# Uso: bash scripts/disk-analysis.sh

set -e

echo "=============================================="
echo "  ANÁLISE DE DISCO"
echo "  $(date -Iseconds)"
echo "=============================================="
echo ""

echo "--- Partições (df -h) ---"
df -h
echo ""

echo "--- Uso por diretório raiz ---"
du -xsh /* 2>/dev/null | sort -hr
echo ""

echo "--- Docker: uso de espaço ---"
if command -v docker &>/dev/null; then
  docker system df
  echo ""
  echo "--- Imagens Docker (maiores) ---"
  docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" | head -30
else
  echo "Docker não encontrado."
fi
echo ""

echo "--- /var (resumo) ---"
du -xsh /var/lib/docker /var/log /tmp /var/cache 2>/dev/null || true
echo ""

echo "--- Diretórios do usuário em /root ou $HOME ---"
for d in .cursor-server .antigravity-server .local .cache .npm node_modules; do
  [ -d "$HOME/$d" ] && du -sh "$HOME/$d" 2>/dev/null
done
echo ""

echo "--- Top 15 maiores diretórios em /var ---"
du -xsh /var/* 2>/dev/null | sort -hr | head -15
echo ""

echo "=============================================="
echo "  Fim da análise"
echo "=============================================="
