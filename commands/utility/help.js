const { MessageEmbed } = require('discord.js');

module.exports = {
	name:'help',
	description: 'Display all the available commands',
	guildOnly:true,
	/**
   * @param {import('discord.js').Message} message
   */
	async run(message) {
		try {
			const SlashCommands = await message.client.application.commands.fetch();
			const descArray = [];
			SlashCommands.each((command) => {
				descArray.push(`**/${command.name}** - ${command.description}`);
			});

			const embed = new MessageEmbed(
				{
					title:'Commands for Hanyuu',
					color: 'RANDOM',
					description: descArray.join('\n'),
					footer: { text:'**P.S** : If it first time adding the bot, there might be delay on synchronizing the slash commands to your server/guild' },
				},
			);

			return message.channel.send({ embeds: [embed] });

		}
		catch (error) {
			console.log(error);
		}
	},
};