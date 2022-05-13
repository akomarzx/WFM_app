module.exports = {
    apps: [{
      script: "./app.js",
      watch : true,
      exec_mode : "cluster",
      instances : 8,
      env_development: {
        PORT : 8080,
        NODE_ENV: "development",
        name : "dev"
      },
      env_production: {
        PORT: 8080,
        NODE_ENV: "production",
        name : "prod"
        }
    }]
  }
  