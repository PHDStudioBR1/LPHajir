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

O envio de e-mail usa **EmailJS** no cliente (igual ao projeto phdstudio). As variáveis abaixo são **incluídas no build** da imagem (não aparecem em `docker exec ... env`). Elas precisam estar nos **Secrets do GitHub** para o job de **Build** do workflow:

| Secret (nome exato no GitHub) | Descrição |
|--------|-----------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | ID do serviço no EmailJS (ex.: `service_xxxxx`) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | ID do template no EmailJS (ex.: `template_xxxxx`) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Chave pública do EmailJS |
| `NEXT_PUBLIC_NOTIFICATION_EMAIL` | E-mail que recebe os leads (ex.: phdstudiobr@gmail.com) |

**Importante:** Depois de criar/alterar esses secrets, é necessário **rodar o workflow de novo** (push na `main` ou "Run workflow") para **reconstruir a imagem**. Só fazer pull e restart do container não basta — as variáveis são gravadas no JavaScript no momento do build.
Ver **docs/EMAIL-EMAILJS.md** para detalhes do template e configuração.

## Opcionais (ajustar se necessário)

| Secret | Descrição | Padrão |
|--------|-----------|--------|
| `ENABLE_CRM` | Enviar leads para o CRM PHD (`true` ou `false`) | `false` (Docker) / `true` (K8s) |
| `CRM_BASE_URL` | URL do CRM PHD | https://phdcrm.546digitalservices.com |
| `CRM_TENANT_SLUG` | Tenant do CRM | hajir |
| `CRM_USER_ID` | ID do usuário no CRM | 1 |
| `CRM_ADMIN_EMAIL` | E-mail de login do CRM | admin@hajir |
| `CRM_ADMIN_PASSWORD` | Senha do CRM | - |
| `DOCKER_NETWORK` | Nome da rede Docker do Nginx | drahajirabdalla_drahajirabdalla-network |

## Como verificar se o CRM está recebendo leads

- **Logs do container (Docker):** `docker logs -f --tail=100 lphajir-web | egrep "CRM|Erro"`
  - Se aparecer `CRM login failed` ou `CRM create lead failed`, as credenciais ou a API do CRM estão com problema.
  - Se não aparecer nenhum erro de CRM ao enviar o formulário e o lead não surgir no painel do CRM, confira se `ENABLE_CRM` está `true` no ambiente.
- **Deploy Docker:** crie o secret `ENABLE_CRM` com valor `true` em Settings → Secrets → Actions para ativar o envio ao CRM.

## O que foi corrigido no deploy

1. **502 Bad Gateway**: O container agora é criado com `--network`, na mesma rede do Nginx
2. **Formulário não envia**: Variáveis de ambiente (Web3Forms, CRM) são passadas ao container
