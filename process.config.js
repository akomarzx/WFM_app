module.exports = {
  apps: [{
    script: './app.js',
    watch: true,
    exec_mode: 'cluster',
    instances: 8,
    env_production: {
      NODE_ENV: 'production',
      name: 'prod',
    },
  }],
};

