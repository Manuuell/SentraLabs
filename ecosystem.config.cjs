// Configuración de PM2 para SentraLabs.
// El deploy copia este archivo dentro de .next/standalone, que se sincroniza
// a /var/www/sentralabs en el VPS. Ahí "server.js" es el servidor que genera
// Next en modo standalone.
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
      },
    },
  ],
};
