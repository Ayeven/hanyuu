// eslint-disable-next-line no-unused-vars
const { Anilist, mangadata } = require('../../dependancies/anilist');
const { MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const anilist = require('../../dependancies/database');
/**
* @type {import('enmap')<string|number|`${bigint}`, mangadata>}
*/
const trendingManhwa = anilist.aniManhwaTrending;
/**
* @type {import('enmap')<string|number|`${bigint}`, number>}
*/
const count = anilist.aniManhwaTrendingCount;
module.exports = {
	name: 'mangatrendingkr',
	description: 'Show trending manga(s) [KR] from Anilist up to 50 result',
	cooldown: 10,
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async run(interaction) {
		try{
			await interaction.defer();
			const userId = interaction.user.id;
			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT',
			});

			const del = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_del`,
				emoji: '🗑️',
				label: 'DELETE',
			});

			const getTrendingManhwa = await new Anilist().getTrendingManhwa();
			if (getTrendingManhwa == 'no data found or unexpected server error!') {
				return interaction.editReply(getTrendingManhwa);
			}
			else {
				trendingManhwa.set(userId, getTrendingManhwa);
				count.set(userId, 10);
				const trendingArray = trendingManhwa.get(userId);
				const descArray = [];
				const selectMenu = new MessageSelectMenu({
					customId: `${this.name}`,
					placeholder:'Pick a manga to view details',
				});

				for (let i = 0; i < 10; i++) {
					descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${trendingArray[i].startDate.year} | ${trendingArray[i].title.userPreferred}](https://anilist.co/anime/${trendingArray[i].id})`);
					selectMenu.addOptions([
						{
							label: `${(i + 1).toString().padStart(2, '0')}) Year : ${trendingArray[i].startDate.year}`,
							description: `${trendingArray[i].title.userPreferred}`.slice(0, 48),
							value: `${trendingArray[i].id}`,
						},
					]);
				}
				const embed = new MessageEmbed({
					color: 'RANDOM',
					description: descArray.join('\n'),
				});
				return interaction.editReply({ embeds:[embed], components:[{ type: 'ACTION_ROW', components: [selectMenu] }, { type:'ACTION_ROW', components:[next, del] }] });
			}
		}
		catch(error) {
			console.warn(error);
		}
	},
	/**
    * @param {import('discord.js').SelectMenuInteraction} interaction - Represents a SelectMenu Interaction.
    */
	async selectmenu(interaction) {
		try{
			await interaction.deferUpdate();
			const userId = interaction.user.id;
			const trending = trendingManhwa.get(userId);
			const details = trending.find(({ id }) => `${id}` == interaction.values[0]);
			const embed = new MessageEmbed({
				title: `${details.title.userPreferred}`,
				url: `https://anilist.co/manga/${details.id}`,
				image: { url: `${details.coverImage?.extraLarge ?? details.coverImage?.large}` },
				color: 'RANDOM',
				description: `${details.description}`.replace(/<br>|<b>|<i>|<\/b>|<\/br>|<i>|<\/i>/gm, ' ').slice(0, 1600),
				thumbnail: { url: `${details.coverImage?.large}` },
			});
			return interaction.editReply({ embeds:[embed] });
		}
		catch(error) {
			console.warn(error);
		}
	},
	/**
    * @param {import('discord.js').ButtonInteraction} interaction - Represents a Button Interaction.
    */
	async button(interaction) {
		try {
			await interaction.deferUpdate();
			const userId = interaction.user.id;
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

			const del = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_del`,
				emoji: '🗑️',
				label: 'DELETE',
			});

			const selectMenu = new MessageSelectMenu({
				customId:`${this.name}`,
				placeholder: 'Select an anime to view details',
			});

			const trending = trendingManhwa.get(userId);
			if (interaction.customId == `${this.name}_next` && interaction.user.id === interaction.message.interaction.user.id) {
				count.math(userId, 'add', 10);
				const buttonAction = count.get(userId);
				const descArray = [];
				if (buttonAction < 51) {
					for (let i = buttonAction - 10; i < buttonAction; i++) {
						selectMenu.addOptions([
							{
								label: `${(i + 1).toString().padStart(2, '0')}) Year: ${trending[i].startDate.year}`,
								description: `${trending[i].title.userPreferred}`.slice(0, 48),
								value: `${trending[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${trending[i].startDate.year} | ${trending[i].title.userPreferred}](https://anilist.co/manga/${trending[i].id})`);
					}
					const embed = new MessageEmbed({
						color: 'RANDOM',
						description: descArray.join('\n'),
					});
					interaction.editReply({ content:'\u200b', embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type: 'ACTION_ROW', components: [next, prev, del] }] });
				}

				else {
					interaction.editReply({ content: 'End of line', embeds:[], components: [{ type:'ACTION_ROW', components: [prev, del] }] });
				}
			}

			else if (interaction.customId == `${this.name}_prev` && interaction.user.id === interaction.message.interaction.user.id) {
				count.math(userId, 'sub', 10);
				const buttonAction = count.get(userId);
				const descArray = [];
				if (buttonAction < 10) {
					interaction.editReply({ content: 'End of line', embeds: [], components: [{ type:'ACTION_ROW', components: [next, del] }] });
				}
				else {
					for (let i = buttonAction - 10; i < buttonAction; i++) {
						selectMenu.addOptions([
							{
								label: `${(i + 1).toString().padStart(2, '0')}) Year : ${trending[i].startDate.year}`,
								description: `${trending[i].title.userPreferred}`.slice(0, 48),
								value: `${trending[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${trending[i].startDate.year} | ${trending[i].title.userPreferred}](https://anilist.co/manga/${trending[i].id})`);
					}
					const embed = new MessageEmbed({
						color: 'RANDOM',
						description: descArray.join('\n'),
					});
					interaction.editReply({ content:'\u200b', embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type: 'ACTION_ROW', components: [next, prev, del] }] });
				}
			}

			else if (interaction.customId == `${this.name}_del` && interaction.user.id === interaction.message.interaction.user.id) {
				interaction.deleteReply();
			}
		}
		catch(error) {
			console.warn(error);
		}
	},
};