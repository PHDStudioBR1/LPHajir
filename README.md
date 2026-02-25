# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Backup diário

O projeto inclui um mecanismo de backup com rotação:

- **Script:** `scripts/backup.sh` — gera um arquivo `.tar.gz` do projeto (exclui `node_modules`, `.next`, etc.) e mantém as 7 versões mais recentes.
- **Diretório dos backups:** por padrão `../LPHajir-backups` (irmão da pasta do projeto). Defina `BACKUP_DIR` para alterar.
- **Execução manual:** `./scripts/backup.sh`
- **Execução diária (cron):** `./scripts/install-backup-cron.sh` — agenda o backup todo dia às 02:00. Log em `logs/backup-cron.log`.
- **Variáveis opcionais:** `BACKUP_DIR`, `KEEP_COUNT` (padrão 7), `BACKUP_CRON_HOUR`, `BACKUP_CRON_MINUTE`.
