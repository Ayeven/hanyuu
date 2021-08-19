module.exports = {
	name:'deploy',
	description: 'Deploy global slash command(s)',
	guildOnly:true,
	owner:true,
	/**
   * @param {import('discord.js').Message} message
   * @param {import('discord.js').Collection<string, object>} _messageCommands
   * @param {import('discord.js').Collection<string, object>} slashCommands
   * @param {...string} _args
   */
	async run(message, _args, _messageCommands, slashCommands) {

		const guildCommand = await slashCommands.get('deploy');
		await message.guild.commands.create(guildCommand);
		message.channel.send({ content:'Done' });

	},
};