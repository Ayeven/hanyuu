const moment = require('moment');
const { prefix } = require('../.setting/config.json');
module.exports = {
	name: 'ready',
	/**
     * @param {import("discord.js").Client} client Represent the bot `Client`
     */
	async run(client) {
		const time = moment().format('YYYY MM DD HH:mm:ss');
		client.user.setActivity(`${prefix}help`, { type: 'COMPETING' });
		console.log(`Logged in as ${client.user.tag} at ${time}`);
	},
};
