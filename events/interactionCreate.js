module.exports = {
    name: 'interactionCreate',
    once: false,
    run: async (interaction, client) => {
        if (interaction.isButton()) {
            if (interaction.customId == 'delete_eval') return interaction.message.delete();
        }
    }
}