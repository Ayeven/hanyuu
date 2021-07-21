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
					fields:[
						{
							name:'\u200b',
							value: '**P.S** : If it first time adding the bot, there might be delay on synchronizing the slash commands to your server/guild.\nSome of the commands have subcommands that not shown here, each subcommand(s) will be shown when you typing the main command',
							inline: false,
						},
					],
				},
			);

			return message.channel.send({ embeds: [embed] });

		}
		catch (error) {
			console.log(error);
		}
	},
};