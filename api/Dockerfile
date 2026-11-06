# Imagem base oficial do Node.js (alpine, leve)
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o código da API
COPY server.js ./

# Variável de ambiente com a porta da aplicação
ENV APP_PORT=3000

# Documenta a porta (não libera de verdade, quem libera é o "ports" do compose)
EXPOSE 3000

# Comando executado quando o container inicia
CMD ["node", "server.js"]
