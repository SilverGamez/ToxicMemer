// Modules \\
const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');
const Config = require('./config.json');

// Variables \\
const intents = Discord.GatewayIntentBits;
const client = new Discord.Client({
    intents: [
        intents.Guilds,
        intents.GuildMessages,
        intents.MessageContent
    ]
});

// Command Handler \\

client.commands = new Discord.Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'run' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`)
    }
}

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