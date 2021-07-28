const { Advice } = require('../../dependancies/advice');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'advices',
	description: 'Give you some random advice(s)/activities recommendation',
	options:[
		{
			type:'SUB_COMMAND',
			name:'random',
			description:'Give you random advices',
		},
		{
			type:'SUB_COMMAND',
			name:'activity',
			description:'Give you random activity to look into',
		},
	],
	/**
    * @param {import('discord.js').CommandInteraction} interaction
    */
	async run(interaction) {
		try {
			await interaction.defer();
			if (interaction.options.getSubCommand() == 'random') {
				const response = await new Advice().advice();
				if(response == 'No data found or server is down!') {
					return interaction.followUp(response);
				}
				else {
					const embed = new MessageEmbed({
						color:'RANDOM',
						title: 'Random advices : ',
						description: `${response?.slip.advice}`,
					});
					return interaction.followUp({ embeds:[embed] });
				}
			}

			else {
				const randomActivity = await new Advice().activity();
				if (randomActivity == 'No data found or server is down!') {
					return interaction.followUp(randomActivity);
				}
				else {
					const embed = new MessageEmbed({
						color:'RANDOM',
						title:'Random activity to look for : ',
						description: `Activity : ${randomActivity.activity}\nType : ${randomActivity.type}`,
					});
					return interaction.followUp({ embeds:[embed] });
				}
			}

		}
		catch (error) {
			console.warn(error);
			return interaction.editReply('Failed to execute Slash Command');
		}
	},
};