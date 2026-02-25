#!/bin/bash
# Backup diário do projeto LPHajir com rotação (mantém 7 versões).
# Uso: ./scripts/backup.sh
# Para execução diária automática, use o cron: scripts/install-backup-cron.sh

set -e

# Configuração
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-$(dirname "$PROJECT_ROOT")/LPHajir-backups}"
KEEP_COUNT="${KEEP_COUNT:-7}"
DATE_SUFFIX="$(date +%Y%m%d-%H%M%S)"
ARCHIVE_NAME="LPHajir-${DATE_SUFFIX}.tar.gz"

# Exclusões (pastas/arquivos pesados ou desnecessários para restore)
EXCLUDE_LIST=(
  --exclude='node_modules'
  --exclude='.next'
  --exclude='out'
  --exclude='build'
  --exclude='.turbo'
  --exclude='.cache'
  --exclude='coverage'
  --exclude='.vercel'
  --exclude='storybook-static'
  --exclude='.genkit'
  --exclude='*.log'
  --exclude='logs'
  --exclude='.env'
  --exclude='.idx'
  --exclude='.modified'
)

mkdir -p "$BACKUP_DIR"
ARCHIVE_PATH="${BACKUP_DIR}/${ARCHIVE_NAME}"

echo "[$(date -Iseconds)] Iniciando backup de $PROJECT_ROOT -> $ARCHIVE_PATH"

cd "$PROJECT_ROOT"
tar czf "$ARCHIVE_PATH" "${EXCLUDE_LIST[@]}" .

echo "[$(date -Iseconds)] Backup criado: $ARCHIVE_PATH"

# Rotação: manter apenas os KEEP_COUNT backups mais recentes
count=$(find "$BACKUP_DIR" -maxdepth 1 -name 'LPHajir-*.tar.gz' -type f | wc -l)
if [ "$count" -gt "$KEEP_COUNT" ]; then
  echo "[$(date -Iseconds)] Rotação: removendo backups antigos (mantendo $KEEP_COUNT)"
  find "$BACKUP_DIR" -maxdepth 1 -name 'LPHajir-*.tar.gz' -type f -printf '%T@ %p\n' \
    | sort -n \
    | head -n -"$KEEP_COUNT" \
    | cut -d' ' -f2- \
    | xargs -r rm -v --
fi

echo "[$(date -Iseconds)] Backup concluído. Total de backups no diretório: $(find "$BACKUP_DIR" -maxdepth 1 -name 'LPHajir-*.tar.gz' -type f | wc -l)"
