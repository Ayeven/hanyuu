const { Advice } = require('../../dependancies/advice');
const { MessageEmbed, Constants } = require('discord.js');
const type = Constants.ApplicationCommandOptionTypes;
module.exports = {
	name: 'advices',
	description: 'Give you some random advice(s)/activities recommendation',
	options:[
		{
			type:type.SUB_COMMAND,
			name:'random',
			description:'Give you random advices',
		},
		{
			type:type.SUB_COMMAND,
			name:'activity',
			description:'Give you random activity to look into',
		},
	],
	/**
    * @param {import('discord.js').CommandInteraction} interaction
    */
	async slashcommand(interaction) {
		try {
			await interaction.deferReply({ ephemeral: true });
			if (interaction.options.getSubcommand() == 'random') {
				const response = await new Advice().advice();
				if(typeof response === 'string') {
					return interaction.editReply(response);
				}
				else {
					const embed = new MessageEmbed({
						color:'RANDOM',
						title: 'Random advices : ',
						description: `${response?.slip.advice}`,
					});
					return interaction.editReply({ embeds:[embed] });
				}
			}

			else {
				const randomActivity = await new Advice().activity();
				if (typeof randomActivity === 'string') {
					return interaction.editReply(randomActivity);
				}
				else {
					const embed = new MessageEmbed({
						color:'RANDOM',
						title:'Random activity to look for : ',
						description: `Activity : ${randomActivity.activity}\nType : ${randomActivity.type}`,
					});
					return interaction.editReply({ embeds:[embed] });
				}
			}

		}
		catch (error) {
			console.warn(error);
			return interaction.editReply('Failed to execute Slash Command');
		}
	},
};