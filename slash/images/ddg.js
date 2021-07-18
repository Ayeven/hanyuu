const { result, vqd } = require('../../dependancies/ddg');
const Enmap = require('enmap');
const enmap = new Enmap({ name: 'images', dataDir: './data/images', fetchAll: false, autoFetch: true });
const delay = function delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time).unref());
};
const { MessageButton } = require('discord.js');
const en = new Enmap({ name: 'count', dataDir: './data/images', fetchAll: false, autoFetch: true });
module.exports = {
	name: 'duckduckgo',
	description: 'Search something online with Duck Duck Go service',
	cooldown: 10,
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
			],
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async run(interaction) {
		try {
			await interaction.defer();
			const userId = `${interaction.user.id}`;
			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
			});
			if (interaction.options.get('images')) {
				const n = 5;
				const j = 0 ;
				const enquiry = interaction.options.get('images')?.options.get('images').value;
				const getToken = await vqd(enquiry);
				const getImage = await result(enquiry, getToken[1]);
				en.set(userId, 5);
				/**
                * @type {Enmap<userId, getImage>}
                */
				enmap.set(userId, getImage);
				await delay(500);
				const array = enmap.get(userId);
				const files = [];
				for (let i = j; i < n; i++) {
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
			});

			const prev = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_prev`,
				emoji: '⏮️',
			});

			const array = enmap.get(userId);
			const files = [];
			if (interaction.customId == `${this.name}_next` && interaction.user.id === interaction.member.id) {
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

			else if (interaction.customId == `${this.name}_prev` && interaction.user.id === interaction.member.id) {
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