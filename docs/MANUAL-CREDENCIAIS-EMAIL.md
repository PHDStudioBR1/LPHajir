# Manual: Criar credenciais de e-mail para o site (drahaabdalla@gmail.com)

Este manual é para **quem usa o e-mail drahaabdalla@gmail.com** e precisa criar as credenciais para o formulário de contato do site enviar as mensagens para essa caixa de entrada.

O site usa o serviço **Web3Forms** para enviar os e-mails. É gratuito e os dados chegam direto no Gmail que você configurar.

---

## O que você vai fazer

1. Criar uma **Access Key** (chave de acesso) no Web3Forms usando o e-mail **drahaabdalla@gmail.com**.
2. Enviar essa chave para quem configura o site (ou colocá-la no painel do servidor, conforme orientação).

---

## Passo a passo

### 1. Acessar o site do Web3Forms

Abra no navegador:

**https://web3forms.com/#start**

(ou https://web3forms.com e clique em “Get started” / “Começar”.)

### 2. Preencher o formulário para receber a chave

Na página inicial do Web3Forms você verá um formulário. Preencha:

- **Your Email:**  
  `drahaabdalla@gmail.com`  
  (o mesmo e-mail onde você quer receber os contatos do site.)

- **Subject (opcional):**  
  Pode deixar em branco ou escrever algo como: `Contato do site Hajir`.

Depois clique em **Submit** (ou “Enviar”).

### 3. Receber a Access Key no e-mail

- Em alguns minutos você receberá um e-mail do Web3Forms no endereço **drahaabdalla@gmail.com**.
- **Verifique também** a pasta **Promoções** e **Atualizações** (e Spam, se não achar).
- O e-mail contém uma **Access Key**: uma chave longa, parecida com:
  - `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Não compartilhe essa chave em redes sociais nem em lugares públicos.** Só envie para quem for configurar o site (por canal seguro, ex.: WhatsApp ou e-mail privado).

### 4. Enviar a chave para quem configura o site

Envie para o responsável pela configuração do site:

- A frase: **“Aqui está a Access Key do Web3Forms para o formulário de contato.”**
- A **Access Key** completa (copie e cole do e-mail, sem espaços no início ou no fim).

Exemplo de mensagem:

> Aqui está a Access Key do Web3Forms para o formulário de contato:  
> `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

Quem configura o site vai colocar essa chave na variável **`CONTACT_FORM_KEY`** (e, se usar ambiente local, também em **`NEXT_PUBLIC_CONTACT_FORM_KEY`**). Detalhes em **DEPLOY-SECRETS.md** e **.env.example**.

---

## Resumo

| O que | Onde / como |
|-------|------------------|
| E-mail que recebe os contatos | **drahaabdalla@gmail.com** (já é o padrão do site) |
| Serviço de envio | Web3Forms (https://web3forms.com) |
| O que você precisa criar | Uma **Access Key** no Web3Forms usando drahaabdalla@gmail.com |
| O que fazer com a chave | Enviar para quem configura o site (ou colocá-la no servidor conforme orientação) |

Depois que a chave for configurada no servidor, todo envio do formulário de contato do site será recebido em **drahaabdalla@gmail.com**.

---

## Problemas comuns

- **Não recebi o e-mail do Web3Forms**  
  Espere alguns minutos e confira Promoções, Atualizações e Spam. Use exatamente **drahaabdalla@gmail.com** no formulário do Web3Forms.

- **Quero usar outro e-mail no futuro**  
  Você pode criar uma nova Access Key no Web3Forms com o outro e-mail e enviar a nova chave para quem configura o site. O destino dos e-mails também pode ser alterado pela variável `NOTIFICATION_EMAIL` (ver DEPLOY-SECRETS.md).

- **Onde ver a chave de novo?**  
  No e-mail que o Web3Forms enviou para drahaabdalla@gmail.com. Se perdeu, crie uma nova chave em https://web3forms.com/#start com o mesmo e-mail.
