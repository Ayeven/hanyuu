const moment = require('moment');
module.exports = {
	name: 'ready',
	/**
     * @param {import("discord.js").Client} client Represent the bot `Client`
     */
	async run(client) {
		const time = moment().format('YYYY MM DD HH:mm:ss');
		setInterval(async () => {
			const commands = await client.application.commands.fetch();
			void client.user.setActivity(`/${commands.random().name} for ${client.guilds.cache.size} server`, { type: 'PLAYING' });
		}, (30 * 60 * 1000));
		console.log(`Logged in as ${client.user.tag} at ${time}`);
	},
};
