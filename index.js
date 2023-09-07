// Modules \\
const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');
const Config = require('./config.json');

// Variables \\
const client = new Discord.Client({
    intents: Object.keys(Discord.GatewayIntentBits).map((intent) => {
        return Discord.GatewayIntentBits[intent]
    })
});

// Command Handler \\

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdirSync('./commands').forEach(dir => {
    const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);

        if ('data' in command && 'run' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`)
        }

        if (command.data.aliases.length) {
            command.data.aliases.forEach(alias => client.aliases.set(alias, command.data.name));
        }
    }
});

// Event Handler \\

const eventsPath = path.join(__dirname, 'events');
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.run(...args, client));
    } else {
        client.on(event.name, (...args) => event.run(...args, client));
    }
}

// Login \\

client.login(Config.token);