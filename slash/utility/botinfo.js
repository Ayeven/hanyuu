const moment = require('moment');
module.exports = {
	name: 'botinfo',
	description: 'Show up my info!',
	/**
   * @param {import('discord.js').CommandInteraction} interaction Represent `CommandInteraction botinfo`
   */
	async slashcommand(interaction) {

		try {
			await interaction.defer({ ephemeral: true });
			const _me = interaction.client.user;
			const _meMe = interaction.guild?.me;
			const embed = {
				color:0xC6E2FF,
				title:_me.tag,
				fields:[
					{
						name:'Created since:',
						value:moment(_me.createdTimestamp).format('YYYY MM DD HH:mm:ss [UTC+8]'),
						inline:true,
					},
					{
						name:'Nickname in this guild',
						value:_meMe?.displayName ?? _me?.username,
						inline:true,
					},
					{
						name:'Joined at',
						value:moment(_meMe?.joinedTimestamp).format('YYYY MM DD HH:mm:ss [UTC+8]') ?? 'Not sure when I join here',
						inline:true,
					},
					{
						name:`One of my role here is ${_meMe?.roles.cache.random()?.name ?? _meMe?.roles.botRole ?? 'I only exist for `/` command'} `,
						value: `**With permission(s):** ${_meMe?.roles.cache.first()?.permissions.toArray().join(', ') ?? 'of no permission(s)'}`,
						inline:true,
					},
				],
				image:{
					url:_me.displayAvatarURL({ format:'png', dynamic:true, size:1024 }),
				},
				timestamp: new Date(),
			};
			interaction.editReply({ embeds:[embed] });
		}
		catch (err) {
			interaction.followUp('Oh No!! Something went wrong');
			console.error(err);
		}
	},

};