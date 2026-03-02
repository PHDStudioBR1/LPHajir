# Análise de disco

Relatório gerado a partir da análise do ambiente (workspace e, se aplicável, servidor de deploy).

## Resumo do ambiente analisado

| Item | Valor |
|------|--------|
| **Disco raiz** | 48G total, **40G em uso (83%)**, 8,3G livres |
| **Risco** | Alto se mais ~8G forem usados (builds, imagens, logs) |

---

## Onde está o espaço

### 1. Docker (principal consumidor)

- **Total em imagens:** ~25,2 GB  
- **Recuperável (não em uso):** ~24 GB (95%)

Há muitas imagens antigas/não taggeadas do `lphajir-web` (várias de ~1,2–1,3 GB cada) e uma `nginx:alpine` (~62 MB). Apenas 2 imagens estão em uso (containers ativos).

**Ação recomendada no servidor de deploy:** o workflow de CI/CD já faz `docker system prune -af` e `docker builder prune -af` antes do pull. Se o disco continuar cheio, rodar manualmente no servidor:

```bash
docker system prune -af
docker builder prune -af
```

### 2. Diretórios em `/root` (ambiente atual)

| Diretório | Tamanho | Observação |
|-----------|---------|------------|
| `.cursor-server` | ~1,9 GB | Cache/serviços Cursor |
| `.antigravity-server` | ~427 MB | Serviços do ambiente |
| `.local` | ~160 MB | Dados locais do usuário |
| `.cache` | ~127 MB | Cache geral |
| Projetos (LPHajir, Hajer, backups) | ~194 MB | Código e backups |

### 3. Partições

- **`/` (raiz):** 48G, 83% usado — partição crítica.
- **`/boot`:** 881M, 15% usado.
- **tmpfs:** uso baixo.

---

## Recomendações

### No servidor de deploy (onde deu “no space left on device”)

1. **Limpeza Docker (já automatizada no workflow):**  
   O job `Deploy no Docker` já executa no servidor, antes do `docker pull`:
   - `docker stop` / `docker rm` do container da app  
   - `docker system prune -af`  
   - `docker builder prune -af`  

2. **Se ainda faltar espaço, rodar no servidor via SSH:**
   ```bash
   docker system prune -af
   docker builder prune -af
   df -h /
   ```

3. **Analisar uso completo no servidor:**  
   Copiar e executar no servidor (por SSH):
   ```bash
   bash scripts/disk-analysis.sh
   ```
   Ou, se o repositório não estiver no servidor:
   ```bash
   df -h
   docker system df
   du -xsh /var/lib/docker /var/log /tmp
   ```

### No ambiente local / workspace

- Para liberar espaço Docker (se quiser):  
  `docker system prune -af`  
  (vai remover as ~24 GB de imagens não usadas).
- Cursor e caches em `/root` somam ~2,5 GB; limpar só se necessário (ex.: `.cache`).

---

## Script de análise

O script `scripts/disk-analysis.sh` pode ser executado em qualquer máquina (local ou servidor de deploy) para gerar um relatório de uso de disco (partições, Docker, `/var`, diretórios do usuário). Basta rodar:

```bash
bash scripts/disk-analysis.sh
```

Para salvar o resultado em arquivo (ex.: no servidor via SSH):

```bash
bash scripts/disk-analysis.sh > relatorio-disco.txt 2>&1
```
