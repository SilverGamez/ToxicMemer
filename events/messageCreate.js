module.exports = {
    name: 'messageCreate',
    once: false,
    run: async (message, client, db) => {
        if (message.author.bot) return;
        if (!message.guild) return message.channel.send("Commands are disabled in dms.");

        let prefix = await db.get(`${message.guild.id}.prefix`) || client.config.prefix;

        if (!message.content.startsWith(prefix)) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);

        const args = message.content.slice(prefix.length).trim().split(' ');
        const cmd = args.shift().toLowerCase();

        if (cmd.length == 0) return;

        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));

        if (command) {
            try {
                if (command.data.botdevonly && message.author.id !== client.config.botdevid) return message.channel.send("You don't have access to this command.");

                // await db.add(`${message.author.id}.commandsUsed`, 1);
                command.run(message, args, client, db);
            } catch (error) {
                console.log(error);
                message.channel.send("Something went wrong. Try again later.");
            }
        }
    }
}