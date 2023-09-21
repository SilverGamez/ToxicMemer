// Modules \\
const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk').default;
const QuickDB = require('quick.db').QuickDB;
const Config = require('./config.json');

const client = new Discord.Client({
    intents: Object.keys(Discord.GatewayIntentBits).map((intent) => {
        return Discord.GatewayIntentBits[intent]
    })
});

// Client Variables \\

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.createEmbed = require('./Functions/createEmbed');
client.numberComma = require('./Functions/numberToComma');

client.config = Config;
client.db = new QuickDB();

// Handlers \\

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// Login \\

client.login(Config.token);