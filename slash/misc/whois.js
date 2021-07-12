const moment = require('moment');
module.exports = {
	name: 'whois',
	description: 'Check some user info',
	options: [
		{
			type: 'USER',
			name:'user',
			description: 'Who do you want to look into?',
			required:true,
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction Represent `CommandInteraction whois`
   */
	async run(interaction) {
		try {
			await interaction.defer();
			const target = interaction.options.get('user').user;
			const embed = {
				color:0xC6E2FF,
				title:target.tag,
				fields:[
					{
						name:'Created since:',
						value:moment(target.createdTimestamp).format('YYYY MM DD HH:mm:ss [UTC+8]'),
						inline:false,
					},
				],
				image:{
					url:target.displayAvatarURL({ format:'png', dynamic:true, size:1024 }),
				},
				timestamp: new Date(),
			};
			return interaction.followUp({ embeds:[embed] });
		}
		catch (err) {
			interaction.followUp({ content:'Oh No!! Something went wrong', ephemeral:true });
			console.error(err);
		}
	},

};