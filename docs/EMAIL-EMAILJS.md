# E-mail via EmailJS (igual ao projeto phdstudio)

O envio de e-mails de lead do site usa **EmailJS** no cliente (browser), no mesmo padrão do projeto phdstudio.

## Variáveis de ambiente (cliente)

Configure no `.env.local` e no deploy (variáveis precisam ser `NEXT_PUBLIC_*` para estarem disponíveis no cliente):

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | ID do serviço no painel EmailJS |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | ID do template no EmailJS |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Chave pública do EmailJS |
| `NEXT_PUBLIC_NOTIFICATION_EMAIL` | E-mail que recebe os leads (ex.: drahaabdalla@gmail.com) |

## Template no EmailJS

O template no painel do EmailJS deve usar exatamente estas variáveis:

- **Subject:** `Novo Lead - {{from_name}}` (ou similar)
- **Body:** Nome: `{{from_name}}`, E-mail: `{{from_email}}`, WhatsApp: `{{phone}}`, Mensagem: `{{message}}`, Responder para: `{{reply_to}}`
- **To Email:** use `{{email}}` no template (o código envia o destinatário nesse campo)

Nomes obrigatórios: `from_name`, `from_email`, `phone`, `message`, `reply_to`, `email`.

## Onde o e-mail é enviado

- Formulário de contato (landing e página /formulario): `ContactForm` → `sendLeadEmail()` (EmailJS) → `submitContactForm()` (CRM, se ativo)
- Formulário na LP PSI: `LpsiContact` → `sendLeadEmail()` (EmailJS) → `submitContactForm()` (CRM, se ativo)

## Configuração rápida

1. Crie uma conta em https://www.emailjs.com/
2. Crie um serviço de e-mail (ex.: Gmail) e conecte sua conta
3. Crie um template com as variáveis acima
4. Defina as variáveis no ambiente (build/deploy) e no `.env.local` para desenvolvimento
