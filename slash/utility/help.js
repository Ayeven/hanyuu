const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Show my available commands',
	cooldown: 5,
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async run(interaction) {
		try {
			await interaction.defer({ ephemeral:true });
			const slashcommands = await interaction.client.application.commands.fetch();
			const descArray = [];
			slashcommands.each((command) => {
				descArray.push(`**/${command.name}** - ${command.description}`);
			});
			const embed = new MessageEmbed(
				{
					title: 'Commands for Hanyuu',
					color: 'RANDOM',
					description: descArray.join('\n'),
					fields: [
						{
							name: '\u200b',
							value: '**P.S** : If it first time adding the bot, there might be delay on synchronizing the slash commands to your server/guild.\nSome of the commands have subcommands that not shown here, each subcommand(s) will be shown when you typing the main command',
							inline: false,
						},
					],
				},
			);
			return interaction.editReply({ embeds: [embed] });
		}
		catch (err) {console.error(err);}
	},
};