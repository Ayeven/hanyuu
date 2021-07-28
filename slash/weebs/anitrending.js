// eslint-disable-next-line no-unused-vars
const { Anilist, animedata } = require('../../dependancies/anilist');
const { MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const Enmap = require('enmap');
/**
* @type {Enmap<`${bigint}`, animedata>}
*/
const aniTrending = new Enmap({ name:'anilist_trending', dataDir: './data/anime', fetchAll: false, autoFetch: true });
/**
* @type {Enmap<`${bigint}`, number>}
*/
const count = new Enmap({ name:'anitrending_count', dataDir: './data/anime', fetchAll: false, autoFetch: true });
module.exports = {
	name: 'anitrending',
	description: 'Anilist anime trending(s) up to 50 result',
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

			const trend = await new Anilist().getTrendingAnime();
			if (trend == 'no data found or unexpected server error!') {
				return interaction.editReply(trend);
			}
			else {
				const setTrend = aniTrending.set(userId, trend);
				count.set(userId, 10);
				const arrayTrend = setTrend.get(userId);
				const descArray = [];
				const selectMenu = new MessageSelectMenu({
					customId:`${this.name}`,
					placeholder: 'Select an anime to view details',
				});
				for (let i = 0; i < 10; i++) {
					selectMenu.addOptions([
						{
							label: `${(i + 1).toString().padStart(2, '0')}) Year : ${arrayTrend[i].startDate.year}`,
							description: `${arrayTrend[i].title.userPreferred}`.slice(0, 48),
							value: `${arrayTrend[i].id}`,
						},
					]);
					descArray.push(`[${i + 1}) ${arrayTrend[i].startDate.year} ${arrayTrend[i].title.userPreferred}](https://anilist.co/anime/${arrayTrend[i].id})`);
				}
				const embed = new MessageEmbed({
					color: 'RANDOM',
					description: descArray.join('\n'),
				});
				return interaction.editReply({ embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type:'ACTION_ROW', components: [next, del] }] });
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
		try {
			await interaction.deferUpdate();
			const userId = interaction.user.id;
			const getTrend = aniTrending.get(userId);
			const detail = getTrend.find(({ id })=> `${id}` == interaction.values[0]);
			const embed = new MessageEmbed({
				title: `${detail.title.userPreferred}`,
				url: `https://anilist.co/anime/${detail.id}`,
				image: { url: `${detail.coverImage?.extraLarge ?? detail.coverImage?.large}` },
				color: 'RANDOM',
				description: `${detail.description}`.replace(/<br>|<b>|<i>|<\/b>|<\/br>|<i>|<\/i>/gm, ' ').slice(0, 1600),
			});
			return interaction.followUp({ embeds:[embed] });
		}
		catch(error) {
			console.warn(error);
		}
	},
	/**
    * @param {import('discord.js').ButtonInteraction} interaction
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

			const getTrend = aniTrending.get(userId);
			if (interaction.customId == `${this.name}_next` && interaction.user.id === interaction.message.interaction.user.id) {
				count.math(userId, 'add', 10);
				const buttonAction = count.get(userId);
				const descArray = [];
				if (buttonAction < 51) {
					for (let i = buttonAction - 10; i < buttonAction; i++) {
						selectMenu.addOptions([
							{
								label: `${(i + 1).toString().padStart(2, '0')} Year : ${getTrend[i].startDate.year}`,
								description: `${getTrend[i].title.userPreferred}`.slice(0, 48),
								value: `${getTrend[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${getTrend[i].startDate.year} ${getTrend[i].title.userPreferred}](https://anilist.co/anime/${getTrend[i].id})`);
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
								label: `${(i + 1).toString().padStart(2, '0')} Year : ${getTrend[i].startDate.year}`,
								description: `${getTrend[i].title.userPreferred}`.slice(0, 48),
								value: `${getTrend[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${getTrend[i].startDate.year} ${getTrend[i].title.userPreferred}](https://anilist.co/anime/${getTrend[i].id})`);
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