module.exports = {
	name:'deploy',
	description: 'Deploy global slash command(s)',
	guildOnly:true,
	owner:true,
	/**
   * @param {import('discord.js').Message} message
   * @param {import('discord.js').Collection<string, object>} _messageCommands
   * @param {import('discord.js').Collection<string, object>} slashCommands
   */
	async run(message, _messageCommands, slashCommands) {

		const guildCommand = await slashCommands.get('deploy');
		await message.client.application.commands.create(guildCommand, guildCommand.guildId);
		message.channel.send({ content:'Done' });

	},
};