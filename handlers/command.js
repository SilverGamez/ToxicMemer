const fs = require('fs');
const chalk = require('chalk').default;

module.exports = (client) => {
    fs.readdirSync('./commands').forEach(dir => {
        const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
    
        for (const file of commandFiles) {
            const command = require(`.././commands/${dir}/${file}`);
            const fileName = file.replace('.js', '');

            console.log(chalk.blue("[COMMAND]") + ` ${fileName} has loaded.`);
    
            if ('data' in command && 'run' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${command} is missing a required "data" or "run" property.`)
            }
    
            if (command.data.aliases.length) {
                command.data.aliases.forEach(alias => client.aliases.set(alias, command.data.name));
            } 
        }
    });

    console.log(chalk.green("[INFO]") + " Commands have loaded.");
}