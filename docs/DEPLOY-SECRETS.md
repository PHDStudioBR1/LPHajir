# Secrets para Deploy Automático (GitHub Actions)

Para o deploy Docker funcionar corretamente (evitar 502 e formulário quebrado), configure estes **secrets** no repositório GitHub:

**Configuração:** Repositório → Settings → Secrets and variables → Actions → New repository secret

## Obrigatórios (SSH)

| Secret | Descrição |
|--------|-----------|
| `DOCKER_SERVER_HOST` | IP ou hostname do servidor |
| `DOCKER_SERVER_USER` | Usuário SSH (ex: root, ubuntu) |
| `DOCKER_SERVER_SSH_KEY` | Chave privada SSH OU use `DOCKER_SERVER_PASSWORD` |

## Obrigatórios (formulário + e-mail)

| Secret | Descrição |
|--------|-----------|
| `RESEND_API_KEY` | Chave da API Resend (resend.com) |
| `NOTIFICATION_EMAIL` | E-mail para receber os leads (ex: phdstudiobr@gmail.com) |

## Opcionais (ajustar se necessário)

| Secret | Descrição | Padrão |
|--------|-----------|--------|
| `RESEND_FROM_EMAIL` | Remetente do e-mail | (usa onboarding@resend.dev) |
| `CRM_BASE_URL` | URL do CRM PHD | https://phdcrm.546digitalservices.com |
| `CRM_TENANT_SLUG` | Tenant do CRM | hajir |
| `CRM_USER_ID` | ID do usuário no CRM | 1 |
| `CRM_ADMIN_EMAIL` | E-mail de login do CRM | admin@hajir |
| `CRM_ADMIN_PASSWORD` | Senha do CRM | - |
| `DOCKER_NETWORK` | Nome da rede Docker do Nginx | drahajirabdalla_drahajirabdalla-network |

## O que foi corrigido no deploy

1. **502 Bad Gateway**: O container agora é criado com `--network`, na mesma rede do Nginx
2. **Formulário não envia**: Variáveis de ambiente (Resend, CRM) são passadas ao container
