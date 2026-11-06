# TP Final: Docker Compose

Arquitetura de Serviços em Nuvem · UNISANTA · Prof. Andrews Egas
Dupla: Murilo Francisco Alvim (RA 240874) e Bruno Barros (RA 131037)

## Objetivo
Ambiente com dois containers orquestrados pelo Docker Compose:
- **site**: site estático com imagem customizada do Nginx → http://localhost:8080
- **api**: API HTTP simples em Node.js → http://localhost:8081

## Estrutura
```
tp-final-docker/
├── docker-compose.yml
├── site/
│   ├── Dockerfile
│   └── index.html
└── api/
    ├── Dockerfile
    └── server.js
```

## Como rodar
```bash
# 1. Buildar a imagem customizada do site
docker build -t tp-final-site ./site

# 2. Subir tudo
docker compose up -d --build

# 3. Testar
#    http://localhost:8080  (site)
#    http://localhost:8081  (api)
#    http://localhost:8081/api/status

# 4. Comandos extras
docker compose ps
docker compose logs -f api
docker compose exec site sh
docker compose exec api sh

# 5. Finalizar
docker compose down
```
