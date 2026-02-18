# LPHajir no Minikube (local)

Manifestos e scripts para subir o projeto no Minikube e acessar em **http://localhost:XXXX** (porta configurável).

## Pré-requisitos

- [Minikube](https://minikube.sigs.k8s.io/docs/start/) instalado
- [kubectl](https://kubernetes.io/docs/tasks/tools/) instalado
- Imagem Docker `donavanalencar/lphajir-web:latest` disponível (build local ou pull do registry)

## Deploy rápido

```bash
cd minikube
chmod +x deploy.sh undeploy.sh
./deploy.sh
```

Por padrão a aplicação fica em **http://localhost:8080**. Para usar outra porta:

```bash
./deploy.sh 8888   # acesse http://localhost:8888
```

O script:

1. Garante que o Minikube está rodando
2. Habilita o addon **ingress** (nginx)
3. Aplica namespace, secrets, deployment e ingress
4. Aguarda os pods ficarem prontos
5. Faz **port-forward** do ingress controller para `localhost:PORT`

Enquanto o script estiver rodando, use **http://localhost:PORT** no navegador. Para encerrar o port-forward: `Ctrl+C`.

## Remover o deploy

```bash
./undeploy.sh
```

## Arquivos

| Arquivo            | Descrição                                      |
|--------------------|------------------------------------------------|
| `namespace.yaml`   | Namespace `lphajir`                            |
| `secrets.yaml`     | Secret com `APP_SECRET` (apenas para dev)      |
| `deployment.yaml`  | Deployment (1 réplica) + Service ClusterIP     |
| `ingress.yaml`     | Ingress nginx para rotear tráfego ao Service   |
| `deploy.sh`        | Script de deploy e port-forward                |
| `undeploy.sh`      | Script para remover todos os recursos          |

## Acesso sem script (apenas Ingress)

Se quiser acessar sem o port-forward do `deploy.sh`:

1. Após o deploy, descubra a URL do ingress controller:
   ```bash
   minikube service ingress-nginx-controller -n ingress-nginx --url
   ```
2. Ou use o IP do minikube:
   ```bash
   minikube ip
   # Acesse http://<IP> (porta 80 se usar tunnel)
   ```
3. Com `minikube tunnel` (em outro terminal), o LoadBalancer do ingress pode receber um IP e você acessa por esse IP.

A forma mais simples para **localhost** é usar o `deploy.sh`, que faz o port-forward automaticamente.
