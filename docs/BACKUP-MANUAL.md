# Manual de Backup — Projeto LPHajir

Manual de referência do sistema de backup diário com rotação de versões. Guarde este documento para consulta e operação do backup.

---

## 1. Visão geral

O projeto dispõe de um mecanismo de backup que:

- Gera um arquivo compactado (`.tar.gz`) do código-fonte e ficheiros do projeto.
- Pode ser executado manualmente ou de forma automática (diária) via cron.
- Mantém **7 versões** dos backups; as mais antigas são removidas automaticamente (rotação).
- Exclui pastas pesadas ou desnecessárias para restauro (ex.: `node_modules`, `.next`).

**Ficheiros envolvidos:**

| Ficheiro | Função |
|----------|--------|
| `scripts/backup.sh` | Script que cria o backup e faz a rotação. |
| `scripts/install-backup-cron.sh` | Instala a tarefa diária no cron. |
| `logs/backup-cron.log` | Log da execução automática (quando o cron está instalado). |

**Diretório dos backups (valor por defeito):** pasta `LPHajir-backups` no mesmo nível da pasta do projeto (ex.: se o projeto está em `/root/LPHajir`, os backups ficam em `/root/LPHajir-backups`).

---

## 2. Requisitos

- **Bash** (script testado em Linux).
- **tar** e **gzip** (habitualmente já instalados).
- Para execução automática: **cron** instalado (`apt install cron` ou `yum install cronie`).

---

## 3. Execução manual

A partir da raiz do projeto:

```bash
./scripts/backup.sh
```

Cada execução cria um ficheiro com data e hora no nome, por exemplo:

`LPHajir-20260225-212539.tar.gz`

A saída do script indica o caminho do backup criado e quantos backups existem no diretório.

---

## 4. Execução diária automática (cron)

### 4.1 Instalar

Execute **uma vez**:

```bash
./scripts/install-backup-cron.sh
```

Isto adiciona uma entrada ao crontab do utilizador atual para correr o backup **todos os dias às 02:00**. A saída é acrescentada ao ficheiro `logs/backup-cron.log`.

### 4.2 Alterar o horário

Antes de instalar, defina as variáveis de ambiente:

```bash
BACKUP_CRON_HOUR=3 BACKUP_CRON_MINUTE=30 ./scripts/install-backup-cron.sh
```

Exemplo: backup todos os dias às **03:30**.

### 4.3 Verificar se o cron está instalado

```bash
crontab -l
```

Deve aparecer uma linha que referencia `scripts/backup.sh` (e o caminho completo do projeto).

### 4.4 Remover o backup automático

1. Abrir o crontab: `crontab -e`
2. Apagar a linha que contém `backup.sh`
3. Gravar e sair

---

## 5. Configuração (variáveis de ambiente)

Podem ser definidas antes de executar os scripts.

| Variável | Descrição | Valor por defeito |
|----------|-----------|-------------------|
| `BACKUP_DIR` | Diretório onde são guardados os ficheiros de backup. | `../LPHajir-backups` (relativo à raiz do projeto) |
| `KEEP_COUNT` | Número de backups a manter (rotação). | `7` |
| `BACKUP_CRON_HOUR` | Hora da execução diária (0–23). Só usado pelo `install-backup-cron.sh`. | `2` |
| `BACKUP_CRON_MINUTE` | Minuto da execução diária (0–59). Só usado pelo `install-backup-cron.sh`. | `0` |

**Exemplos:**

```bash
# Guardar backups noutro disco/pasta e manter 14 versões
BACKUP_DIR=/mnt/backups/LPHajir KEEP_COUNT=14 ./scripts/backup.sh

# Instalar cron para executar às 04:15
BACKUP_CRON_HOUR=4 BACKUP_CRON_MINUTE=15 ./scripts/install-backup-cron.sh
```

---

## 6. O que é incluído e excluído no backup

**Incluído:** código-fonte (`src/`), configuração (`package.json`, `next.config.ts`, etc.), `public/`, `scripts/`, `docs/`, `.git` (histórico), Dockerfile, e demais ficheiros do projeto não listados em exclusões.

**Excluído (não vai no .tar.gz):**

- `node_modules/`
- `.next/`, `out/`, `build/`
- `.turbo/`, `.cache/`, `coverage/`
- `.vercel/`, `storybook-static/`, `.genkit/`
- `.env`, `logs/`, `*.log`
- `.idx/`, `.modified/`

Após restauro, é necessário voltar a instalar dependências (`npm install`) e eventualmente recriar ficheiros `.env` a partir de um exemplo ou de outro backup que os contenha, se aplicável.

---

## 7. Restaurar a partir de um backup

1. Escolher o ficheiro de backup desejado (ex.: `LPHajir-20260225-212539.tar.gz`) no diretório de backups.
2. Numa pasta **vazia** ou onde queira extrair o projeto:

   ```bash
   tar xzf /caminho/para/LPHajir-backups/LPHajir-20260225-212539.tar.gz
   ```

3. Entrar na pasta extraída e instalar dependências:

   ```bash
   cd LPHajir   # ou o nome da pasta onde extraiu
   npm install
   ```

4. Configurar `.env` e outros segredos conforme o ambiente (ex.: usar `docs/DEPLOY-SECRETS.md` ou o que tiver no projeto).

---

## 8. Resolução de problemas

| Problema | Sugestão |
|----------|----------|
| "Permission denied" ao executar o script | `chmod +x scripts/backup.sh scripts/install-backup-cron.sh` |
| Cron não executa | Verificar se o serviço cron está ativo (`systemctl status cron` ou equivalente). Confirmar o caminho absoluto do script no `crontab -l`. |
| Backups não aparecem | Confirmar `BACKUP_DIR` e permissões de escrita nesse diretório. |
| Quero mais de 7 versões | Definir `KEEP_COUNT` (ex.: `KEEP_COUNT=14 ./scripts/backup.sh`) ou alterar o valor no script. |
| Ver o que correu no último backup automático | Consultar `logs/backup-cron.log`. |

---

## 9. Resumo rápido

| Ação | Comando |
|------|--------|
| Fazer backup agora | `./scripts/backup.sh` |
| Ativar backup diário (02:00) | `./scripts/install-backup-cron.sh` |
| Ver logs do backup automático | `cat logs/backup-cron.log` |
| Listar backups existentes | `ls -la ../LPHajir-backups/` (ou o valor de `BACKUP_DIR`) |
| Restaurar um backup | `tar xzf ../LPHajir-backups/LPHajir-YYYYMMDD-HHMMSS.tar.gz` (numa pasta vazia) |

---

*Documento gerado para o projeto LPHajir. Atualize este manual se alterar o comportamento dos scripts de backup.*
