# Análise de e-mail (Resend) – Produção

Este documento ajuda a diagnosticar o envio de e-mails de lead pelo Resend e a deixar a configuração estável em produção.

---

## Fluxo no código

1. **Formulário** → `submitContactForm` em `src/lib/actions.ts`
2. **E-mail em primeiro lugar** → `sendLeadNotification(TARGET_EMAIL, data)` em `src/lib/email.ts`
3. **Destino** → `NOTIFICATION_EMAIL` (ex.: drahaabdalla@gmail.com)
4. **Remetente** → `RESEND_FROM_EMAIL` (ex.: `Hajir Site <atendimento@drahajirabdalla.com.br>`)

Se o domínio na Resend estiver **Verified**, use qualquer endereço `@drahajirabdalla.com.br`. Se ainda estiver **Pending**, a Resend pode rejeitar o envio ou os e-mails podem cair em spam.

---

## O que você precisa colar para análise

Quando enviar um lead pelo formulário, reúna estes três blocos e envie para a IA:

### 1. Logs do container (após enviar o formulário)

```bash
docker logs -f --tail=100 lphajir-web 2>&1 | egrep "Resend|E-mail de lead|Erro CRM|CRM login|CRM create lead|CRM create activity"
```

**Cole aqui a saída** que aparecer (mesmo que vazia). Possíveis linhas:

- `E-mail de lead enviado para <email>, id: <id>` → Resend aceitou o envio
- `Erro ao enviar e-mail via Resend: <detalhe>` → falha na API Resend
- `RESEND_API_KEY não configurado` → variável não está no container

### 2. Painel Resend (último e-mail)

- **Status do último e-mail:** Accepted / Delivered / Failed / Bounced
- **Mensagem de erro (se houver):** texto exato do evento na Resend

### 3. Remetente em produção

- Valor atual de `RESEND_FROM_EMAIL` (ex.: `Hajir Site <atendimento@drahajirabdalla.com.br>`)

Para conferir no servidor:

```bash
docker exec lphajir-web env | grep RESEND_FROM_EMAIL
```

---

## Checklist de configuração para produção

| Item | Verificação |
|------|-------------|
| **RESEND_API_KEY** | Definida nos secrets do GitHub e injetada no container (não vazia) |
| **RESEND_FROM_EMAIL** | Formato `Nome <email@drahajirabdalla.com.br>` com domínio **verificado** na Resend |
| **NOTIFICATION_EMAIL** | E-mail que recebe os leads (ex.: drahaabdalla@gmail.com) |
| **Domínio na Resend** | `drahajirabdalla.com.br` com status **Verified** (não apenas Pending) |
| **DNS (domínio)** | Registros DKIM e SPF configurados conforme o painel Resend |

---

## Interpretação rápida

| Log do container | Status Resend | Conclusão |
|------------------|---------------|-----------|
| `E-mail de lead enviado... id: xxx` | Accepted/Delivered | Envio OK; se não chegou, verificar spam/caixa de entrada |
| `E-mail de lead enviado... id: xxx` | Failed/Bounced | Resend aceitou mas falhou na entrega → ver DKIM/SPF/domínio |
| `Erro ao enviar e-mail via Resend` | - | API key, remetente ou domínio inválido; ver mensagem de erro |
| (nada com "E-mail de lead") | - | Request pode não ter chegado ao server action ou log cortado |

---

## Próximos passos para envio estável

1. **Domínio Verified**
   - No painel Resend: Domains → `drahajirabdalla.com.br` deve estar **Verified**.
   - Se estiver **Pending**, adicione os registros DNS que a Resend indicar (DKIM, SPF).

2. **DKIM / SPF**
   - Resend mostra os registros DNS (TXT/CNAME) para o domínio.
   - Configure no provedor do domínio (onde está o DNS de `drahajirabdalla.com.br`).
   - Após propagação, clique em “Verify” na Resend até o status ficar Verified.

3. **DMARC (opcional, recomendado)**
   - Registro TXT `_dmarc.drahajirabdalla.com.br` para reduzir risco de spam e phishing.
   - Pode começar com política branda (ex.: `p=none`) e depois endurecer.

4. **Remetente em produção**
   - Use um endereço do domínio verificado, por exemplo:
     - `RESEND_FROM_EMAIL="Hajir Site <atendimento@drahajirabdalla.com.br>"`
   - Evite `onboarding@resend.dev` em produção (é para testes).

5. **Teste ponta a ponta**
   - Enviar um lead de teste → conferir log “E-mail de lead enviado” → conferir no painel Resend (Delivered) → conferir caixa de entrada (e spam) de `NOTIFICATION_EMAIL`.

---

## Referências

- [Resend – Custom domain / senders](https://resend.com/docs/knowledge-base/how-do-I-create-an-email-address-or-sender-in-resend)
- [Resend – Why emails go to spam (DKIM/SPF/DMARC)](https://resend.com/blog/why-your-emails-are-going-to-spam)
- Secrets do projeto: `docs/DEPLOY-SECRETS.md`
- Comandos de diagnóstico: `docs/COMANDOS-DIAGNOSTICO.md` (seção 14 – Logs Resend)
