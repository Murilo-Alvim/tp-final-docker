// API HTTP simples em Node.js (sem dependências externas)
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const PORT = process.env.APP_PORT || 3000;
const LOG_DIR = '/app/logs';
const LOG_FILE = path.join(LOG_DIR, 'acessos.log');
const inicio = Date.now();
let totalRequisicoes = 0;

fs.mkdirSync(LOG_DIR, { recursive: true });

function registrar(msg) {
  const linha = `[${new Date().toISOString()}] ${msg}`;
  console.log(linha);                         // aparece no docker compose logs
  fs.appendFileSync(LOG_FILE, linha + '\n');  // persiste no volume api_logs
}

const server = http.createServer((req, res) => {
  totalRequisicoes++;
  registrar(`${req.method} ${req.url}`);

  // Libera o site (localhost:8080) para chamar a API
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      status: 'ok',
      servico: 'api',
      container: os.hostname(),
      uptime_segundos: Math.round((Date.now() - inicio) / 1000),
      requisicoes: totalRequisicoes,
      horario: new Date().toISOString()
    }));
  }

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>API · TP Final</title>
<style>body{font-family:system-ui,sans-serif;background:#C9D3DD;color:#0E2A47;padding:48px;line-height:1.5}
code{background:#fff;padding:2px 6px;border-radius:4px}</style></head><body>
<h1>Container 2: API Node.js</h1>
<p>Rodando no container <code>${os.hostname()}</code>, porta interna 3000, exposta em 8081.</p>
<p>Endpoint JSON: <a href="/api/status">/api/status</a></p>
<p>Requisições atendidas: ${totalRequisicoes}</p></body></html>`);
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ erro: 'rota não encontrada', rota: req.url }));
});

server.listen(PORT, () => registrar(`API iniciada na porta ${PORT}`));
