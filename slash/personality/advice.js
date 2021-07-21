const axios = require('axios').default;

const advice = axios.create({
	baseURL: 'https://api.adviceslip.com',
});

const activity = axios.create({
	baseURL: 'https://www.boredapi.com',
});

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
				const response = await advice.get('advice')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!response || !response?.data) { return interaction.followUp('No data found or server is down');}
				else {
					const result = response.data;
					const embed = new MessageEmbed({
						color:'RANDOM',
						title: 'Random advices : ',
						description: `${result?.slip.advice}`,
					});
					return interaction.followUp({ embeds:[embed] });
				}
			}

			else {
				const randomActivity = await activity.get('api/activity')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!randomActivity || !randomActivity?.data) { return interaction.followUp('No data found or server is down');}
				else {
					const result = randomActivity.data;
					const embed = new MessageEmbed({
						color:'RANDOM',
						title:'Random activity to look for : ',
						description: `Activity : ${result.activity}\nType : ${result.type}`,
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