#!/bin/bash
# Instala a execução diária do backup do projeto (cron).
# Uso: ./scripts/install-backup-cron.sh
# Requer: cron instalado (apt install cron / yum install cronie)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BACKUP_SCRIPT="${SCRIPT_DIR}/backup.sh"
LOG_DIR="${PROJECT_ROOT}/logs"
CRON_LOG="${LOG_DIR}/backup-cron.log"

# Horário: todo dia às 02:00 (ajuste conforme necessário)
CRON_HOUR="${BACKUP_CRON_HOUR:-2}"
CRON_MINUTE="${BACKUP_CRON_MINUTE:-0}"

mkdir -p "$LOG_DIR"

CRON_LINE="${CRON_MINUTE} ${CRON_HOUR} * * * ${BACKUP_SCRIPT} >> ${CRON_LOG} 2>&1"

if crontab -l 2>/dev/null | grep -F "$BACKUP_SCRIPT" >/dev/null; then
  echo "Entrada de cron para backup já existe. Nada a fazer."
  exit 0
fi

(crontab -l 2>/dev/null; echo "$CRON_LINE") | crontab -
printf "Cron instalado: backup diário às %02d:%02d.\n" "$CRON_HOUR" "$CRON_MINUTE"
echo "Log: $CRON_LOG"
echo "Para remover: crontab -e e apague a linha do backup.sh"
