# Manual: Credenciais de e-mail para o site (EmailJS – igual ao phdstudio)

Este manual é para **quem usa o e-mail drahaabdalla@gmail.com** (ou outro) e precisa configurar o envio de e-mails do formulário de contato.

O site usa **EmailJS** no navegador (cliente), no mesmo padrão do projeto phdstudio. Os e-mails são enviados diretamente pelo navegador para o EmailJS, que encaminha para o Gmail configurado.

---

## O que você vai fazer

1. Criar uma conta no **EmailJS** (https://www.emailjs.com/).
2. Configurar um **serviço de e-mail** (ex.: Gmail) e um **template** com as variáveis do projeto.
3. Anotar **Service ID**, **Template ID** e **Public Key** e repassar para quem configura o site (ou colocá-los no painel do servidor / GitHub Secrets).

---

## Passo a passo

### 1. Acessar o EmailJS

Abra: **https://www.emailjs.com/** e crie uma conta (ou faça login).

### 2. Criar um serviço de e-mail

- No painel: **Email Services** → **Add New Service**.
- Escolha o provedor (ex.: **Gmail**).
- Conecte a conta Gmail que receberá os contatos (ex.: drahaabdalla@gmail.com).
- Anote o **Service ID** (ex.: `service_xxxxx`).

### 3. Criar um template

- **Email Templates** → **Create New Template**.
- **Subject:** por exemplo: `Novo Lead - {{from_name}}`
- **Content (corpo)** use exatamente estas variáveis:
  - Nome: `{{from_name}}`
  - E-mail: `{{from_email}}`
  - WhatsApp: `{{phone}}`
  - Mensagem: `{{message}}`
  - Responder para: `{{reply_to}}`
  - Para (destinatário): `{{email}}` — o código envia aqui o e-mail que recebe os leads.
- Salve e anote o **Template ID** (ex.: `template_xxxxx`).

### 4. Obter a Public Key

- **Account** → **API Keys** (ou **General**).
- Copie a **Public Key**.

### 5. Enviar as chaves para quem configura o site

Envie:

- **Service ID** (ex.: `service_xxxxx`)
- **Template ID** (ex.: `template_xxxxx`)
- **Public Key**
- **E-mail destinatário** (ex.: drahaabdalla@gmail.com) — usado em `NEXT_PUBLIC_NOTIFICATION_EMAIL`

Quem configura o site vai colocar isso nas variáveis (ou Secrets):

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_NOTIFICATION_EMAIL`

Detalhes em **DEPLOY-SECRETS.md** e **docs/EMAIL-EMAILJS.md**.

---

## Resumo

| O que | Onde / como |
|-------|------------------|
| E-mail que recebe os contatos | **drahaabdalla@gmail.com** (ou o que for definido em `NEXT_PUBLIC_NOTIFICATION_EMAIL`) |
| Serviço de envio | EmailJS (https://www.emailjs.com/) |
| O que configurar | Conta EmailJS, serviço (ex. Gmail), template com variáveis do projeto |
| Variáveis do template | `from_name`, `from_email`, `phone`, `message`, `reply_to`, `email` |

Depois de configuradas no ambiente (build/deploy), todo envio do formulário de contato será recebido no e-mail configurado.

---

## Problemas comuns

- **E-mail não chega**  
  Confira no painel do EmailJS se o envio foi aceito e se o template está ativo. Verifique também Spam e Promoções.

- **Quero usar outro e-mail no futuro**  
  Altere o serviço no EmailJS ou apenas a variável `NEXT_PUBLIC_NOTIFICATION_EMAIL` (ver DEPLOY-SECRETS.md e EMAIL-EMAILJS.md).
