module.exports = {
	name:'deploy',
	description: 'Deploy global slash command(s)',
	guildOnly:true,
	owner:true,
	/**
   * @param {import('discord.js').Message} message
   */
	async run(message) {
		// @ts-expect-error
		const { SlashCommands } = message.client;
		const guildCommand = await SlashCommands.get('deploy');
		await message.client.application.commands.create(guildCommand, guildCommand.guildId);
		message.channel.send({ content:'Done' });

	},
};