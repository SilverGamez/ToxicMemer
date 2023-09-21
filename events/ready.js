const chalk = require('chalk').default;

module.exports = {
    name: 'ready',
    once: true,
    run: async (client) => {
        console.log(chalk.red("[BOT]") + " Bot is online.");
    }
}