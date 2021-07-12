module.exports = {
	name:'reboot',
	description: 'Shutdown/Reboot the bot.Exclusive for bot owner',
	owner:true,
	/**
     * @param {import('discord.js').Message} message Represent the `Command Message`
     */
	async run(message) {
		await message.reply('Bot is now shutting down');
		process.exit(0);
	},
};