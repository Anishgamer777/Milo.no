module.exports = {
  apps : [{
    name: `CLANBOT_${require('path').resolve(__dirname).split("/")[4]}`,
    script: 'index.js',
    max_memory_restart: '200M',
    max_restarts: 5,
//    watch: '.',
    restart_delay: 10000,
    cron_restart: "0 4 * * *"
  }]
};