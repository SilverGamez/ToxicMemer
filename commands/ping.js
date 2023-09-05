const Discord = require('discord.js');

module.exports = {
    data: {
        name: "ping",
        description: "Just a test command",
        botdevonly: false
    },
    run: async(message, args, client, db) => {
        message.channel.send("Pong!");
    }
}