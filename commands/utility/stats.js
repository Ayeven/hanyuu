const moment = require('moment');
require('moment-duration-format');

const Discord = require('discord.js');
module.exports = {
	name:'stats',
	aliases:['info', 'status'],
	description: 'Show the statistic of bot',
	guildOnly:true,
	/**
   * @param {Discord.Message} message
   */
	async run(message) {
		const duration = moment.duration(message.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
		message.channel.send(`\`\`\`asciidoc
      = STATISTICS =
  • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
  • Uptime     :: ${duration}
  • Discord.js :: v${Discord.version}
  • Node       :: ${process.version}
  • User       :: ${message.client.users.cache.size.toLocaleString()}
  • Channels   :: ${message.client.channels.cache.size.toLocaleString()}
  • Guilds     :: ${message.client.guilds.cache.size.toLocaleString()}
  • Platform   :: ${process.platform} ${process.arch}\`\`\``);

	},

};