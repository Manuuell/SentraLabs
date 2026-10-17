// Configuración de PM2 para SentraLabs.
// El deploy copia este archivo dentro de .next/standalone, que se sincroniza
// a /var/www/sentralabs en el VPS. Ahí "server.js" es el servidor que genera
// Next en modo standalone.
const fs = require('fs');

// Secretos de runtime (hoy solo la clave de OpenAI del asistente). Viven fuera
// de la carpeta de deploy a propósito: el rsync del workflow va con --delete y
// borraría cualquier archivo que dejáramos dentro de /var/www/sentralabs.
//
// En el VPS, una vez:
//   sudo install -m 600 -o $USER /dev/null /etc/sentralabs.env
//   echo 'OPENAI_API_KEY=sk-...' | sudo tee /etc/sentralabs.env
//
// Si el archivo no existe, la app arranca igual y /api/chat responde 503:
// el asistente aparece apagado en vez de tumbar el sitio.
const SECRETS_FILE = '/etc/sentralabs.env';

function loadSecrets() {
  const secrets = {};
  let contents;
  try {
    contents = fs.readFileSync(SECRETS_FILE, 'utf8');
  } catch {
    return secrets;
  }

  for (const line of contents.split('\n')) {
    if (!line || line.trimStart().startsWith('#')) continue;
    const separator = line.indexOf('=');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    if (key) secrets[key] = value;
  }
  return secrets;
}

module.exports = {
  apps: [
    {
      name: 'sentralabs',
      script: 'server.js',
      cwd: '/var/www/sentralabs',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        // Nginx hace de proxy inverso contra este puerto (estaba libre en el VPS).
        PORT: 3700,
        // Escucha solo en localhost: el acceso público entra siempre por Nginx,
        // igual que el resto de apps del servidor.
        HOSTNAME: '127.0.0.1',
        // El deploy recarga con --update-env, así que un cambio en el archivo
        // de secretos se recoge en el siguiente despliegue o con pm2 reload.
        ...loadSecrets(),
      },
    },
  ],
};
