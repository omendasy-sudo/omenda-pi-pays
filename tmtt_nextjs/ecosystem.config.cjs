module.exports = {
  apps: [
    {
      name: "omendapipays-next",
      cwd: __dirname,
      script: "node",
      args: "./scripts/next-with-env.mjs .env.production start -p 3000",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};