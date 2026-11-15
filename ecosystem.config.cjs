module.exports = {
  apps: [
    {
      name: 'jntuh-results',
      script: '.next/standalone/server.js',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '384M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
        NODE_OPTIONS: '--max-old-space-size=384',
      },
    },
  ],
};
