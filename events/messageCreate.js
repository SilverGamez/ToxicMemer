const Config = require('../config.json');

const SilverDB = require('silver-db');
const db = new SilverDB('./db.json');

module.exports = {
    name: 'messageCreate',
    once: false,
    run: async (message, client) => {
        if (message.author.bot) return;
        if (!message.guild) return message.channel.send("Commands are disabled in dms.");

        if (!message.content.startsWith(Config.prefix)) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);

        const args = message.content.slice(Config.prefix.length).trim().split(' ');
        const cmd = args.shift().toLowerCase();

        if (cmd.length == 0) return;
        let command = client.commands.get(cmd);

        if (command.data.BotDevOnly && message.author.id !== Config.botdevid) return message.channel.send("You don't have access to this command.");

        try {
            command.run(message, args, client, db);
        } catch (error) {
            console.log(error);
            message.channel.send("Something went wrong. Try again later.");
        }
    }
}