const { result, vqd } = require('../../dependancies/ddg');
const Enmap = require('enmap');
const enmap = new Enmap({ name: 'images', dataDir: './data/images', fetchAll: false, autoFetch: true });
const util = require('util');
const delay = util.promisify(setTimeout);
const { MessageButton } = require('discord.js');
const en = new Enmap({ name: 'count', dataDir: './data/images', fetchAll: false, autoFetch: true });
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
			type:'SUB_COMMAND',
			name:'images',
			description: 'Search some images with Duck Duck Go service',
			options: [
				{
					type:'STRING',
					name: 'images',
					description: 'The image query to look for',
					required: true,
				},
				{
					type:'INTEGER',
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
	async run(interaction) {
		try {
			await interaction.defer({ ephemeral: true });
			const userId = `${interaction.user.id}`;

			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT',
			});

			if (interaction.options.getSubcommand() == 'images') {
				const enquiry = interaction.options.getString('images');
				if (enquiry.match(/[!`~#$%^&*()\\|:;{}[\],><?]+/gm)) { return interaction.followUp('Forbidden character(s) found, please try again');}
				const safe = interaction.options?.getInteger('safesearch') ?? -1;
				const getToken = await vqd(enquiry, safe);
				const getImage = await result(enquiry, getToken[1]);
				en.set(userId, 5);
				/**
                * @type {Enmap<userId, getImage>}
                */
				enmap.set(userId, getImage);
				await delay(100);
				const array = enmap.get(userId);
				const files = [];
				for (let i = 0; i < 5; i++) {
					files.push(array[i].image);
				}
				return interaction.followUp({ content: `${files.join('\n')}`, components: [{ type: 'ACTION_ROW', components:[next] }] });
			}
		}
		catch (err) {console.error(err);}
	},
	/**
    * @param {import('discord.js').ButtonInteraction} interaction
    */
	async button(interaction) {
		try {
			await interaction.deferUpdate();
			const userId = `${interaction.user.id}`;

			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT',
			});

			const prev = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_prev`,
				emoji: '⏮️',
				label: 'PREV',
			});

			const array = enmap.get(userId);
			const files = [];
			if (interaction.customId == `${this.name}_next`) {
				en.math(userId, 'add', 5);
				const m = en.get(userId);
				if (m < 101) {
					for (let i = m - 5; i < m; i++) {
						files.push(array[i]?.image);
					}
					interaction.editReply({ content: `${files.join('\n')}`, components: [{ type: 'ACTION_ROW', components:[next, prev] }] });
				}

				else {
					interaction.editReply({ content: 'End of line', components: [{ type:'ACTION_ROW', components: [prev] }] });
				}
			}

			else if (interaction.customId == `${this.name}_prev`) {
				en.math(userId, 'subtract', 5);
				const m = en.get(userId);
				if (m <= 4) {
					interaction.editReply({ content: 'End of line', components: [{ type: 'ACTION_ROW', components:[next] }] });
				}

				else {
					for (let i = m - 5; i < m; i++) {
						files.push(array[i]?.image);
					}
					interaction.editReply({ content: `${files.join('\n')}`, components: [{ type:'ACTION_ROW', components: [next, prev] }] });
				}
			}

		}
		catch (error) {
			console.warn(error);
		}
	},
};