const { result, vqd } = require('../../dependancies/ddg');
const ddg = require('../../dependancies/database');
const en = ddg.ddgcount;
const enmap = ddg.ddgImage;
const delay = require('util').promisify(setTimeout);
const { MessageButton, Constants } = require('discord.js');
const opt = Constants.ApplicationCommandOptionTypes;
const filterChoices = [
	{
		name: 'strict', value: 1,
	},
	{
		name: 'moderate', value: -1,
	},
];

module.exports = {
	name: 'duckduckgo',
	description: 'Search something online with Duck Duck Go service',
	cooldown: 5,
	options: [
		{
			type: opt.SUB_COMMAND,
			name:'images',
			description: 'Search some images with Duck Duck Go service',
			options: [
				{
					type: opt.STRING,
					name: 'images',
					description: 'The image query to look for',
					required: true,
				},
				{
					type: opt.INTEGER,
					name: 'safesearch',
					description: 'Safe search filter',
					choices: filterChoices,
				},
			],
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async slashcommand(interaction) {
		try {
			await interaction.deferReply({ ephemeral: true });
			const userId = `${interaction.user.id}`;

			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT 5',
			});

			if (interaction.options.getSubcommand() == 'images') {
				const enquiry = interaction.options.getString('images');
				if (enquiry.match(/[!`~#$%^&*()\\|:;{}[\],><?]+/gm)) { return interaction.followUp('Forbidden character(s) found, please try again');}
				const safe = interaction.options?.getInteger('safesearch') ?? -1;
				const getToken = await vqd(enquiry, safe);
				const getImage = await result(enquiry, getToken[1]);
				en.set(userId, 5);
				enmap.set(userId, getImage);
				await delay(100);
				const array = enmap.get(userId);
				const files = [];
				for (let i = 0; i < 5; i++) {
					files.push(array[i].image);
				}
				await interaction.editReply({ content: `${files.join('\n')}`, components: [{ type: 'ACTION_ROW', components:[next] }] });
				await delay(14 * 60 * 1000);
				en.evict(userId);
				enmap.evict(userId);
				return interaction.editReply({ content: '15min have passed, re run the command again if you wish to continue', components:[] });
			}
		}
		catch (err) {console.error(err);}
	},
	/**
    * @param {import('discord.js').ButtonInteraction} interaction
    */
	async button(interaction) {
		try {
			const userId = `${interaction.user.id}`;

			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT 5',
			});

			const prev = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_prev`,
				emoji: '⏮️',
				label: 'PREV 5',
			});

			const array = enmap.get(userId);
			if (array) {
				const files = [];
				if (interaction.customId == `${this.name}_next`) {
					en.math(userId, 'add', 5);
					const m = en.get(userId);
					if (m < 101) {
						for (let i = m - 5; i < m; i++) {
							files.push(array[i]?.image);
						}
						interaction.update({ content: `${files.join('\n')}`, components: [{ type: 'ACTION_ROW', components:[next, prev] }] });
					}

					else {
						interaction.update({ content: 'End of line', components: [{ type:'ACTION_ROW', components: [prev] }] });
					}
				}

				else if (interaction.customId == `${this.name}_prev`) {
					en.math(userId, 'subtract', 5);
					const m = en.get(userId);
					if (m <= 4) {
						interaction.update({ content: 'End of line', components: [{ type: 'ACTION_ROW', components:[next] }] });
					}

					else {
						for (let i = m - 5; i < m; i++) {
							files.push(array[i]?.image);
						}
						interaction.update({ content: `${files.join('\n')}`, components: [{ type:'ACTION_ROW', components: [next, prev] }] });
					}
				}
			}
			else {
				return interaction.update({ content: `Look like you have another ${this.name} command going on, or the time has passed 15min`, components:[] });
			}
		}
		catch (error) {
			console.warn(error);
			interaction.update('Something went wrong executing the command');
		}
	},
};