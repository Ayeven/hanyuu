module.exports = {
	name:'deploy',
	description: 'Deploy global slash command(s)',
	guildOnly:true,
	owner:true,
	/**
   * @param {import('discord.js').Message} message
   */
	async run(message) {
		const { SlashCommands } = message.client;
		await message.client.application.commands.set(SlashCommands);
		message.channel.send({ content:'Done' });

	},
};