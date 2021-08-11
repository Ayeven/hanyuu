// eslint-disable-next-line no-unused-vars
const { Anilist, animedata } = require('../../dependancies/anilist');
const { MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const { aniTrending, aniTendingCount } = require('../../dependancies/database');
const delay = require('util').promisify(setTimeout);
module.exports = {
	name: 'animetrending',
	description: 'Anilist anime trending(s) up to 50 result',
	cooldown: 10,
	/**
   	* @param {import('discord.js').CommandInteraction} interaction
   	*/
	async slashcommand(interaction) {
		try{
			await interaction.deferReply({ ephemeral: true });
			const userId = interaction.user.id;

			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT 10',
			});

			const trend = await new Anilist().getTrendingAnime();
			if (trend == 'no data found or unexpected server error!') {
				return interaction.editReply(trend);
			}
			else {
				/**
    			* @type {import('enmap')<string|number|`${bigint}`, animedata>}
    			*/
				const setTrend = aniTrending.set(userId, trend);
				aniTendingCount.set(userId, 10);
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
					descArray.push(`[${i + 1}) ${arrayTrend[i].startDate.year} | ${arrayTrend[i].title?.english ?? arrayTrend[i].title.userPreferred}](https://anilist.co/anime/${arrayTrend[i].id})`);
				}
				const embed = new MessageEmbed({
					color: 'RANDOM',
					description: descArray.join('\n'),
				});
				await interaction.editReply({ embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type:'ACTION_ROW', components: [next] }] });
				await delay(14 * 60 * 1000);
				aniTrending.evict(userId);
				aniTendingCount.evict(userId);
				return interaction.editReply({ content: '15min have passed, re run the command again if you wish to continue', components:[] });
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
			const userId = interaction.user.id;
			/**
			 * @type {animedata}
			 */
			const getTrend = aniTrending.get(userId);
			const detail = getTrend.find(({ id })=> `${id}` == interaction.values[0]);
			if (detail) {
				const embed = new MessageEmbed({
					title: `${detail.title.userPreferred}`,
					url: `https://anilist.co/anime/${detail.id}`,
					image: { url: `${detail.coverImage?.extraLarge ?? detail.coverImage?.large}` },
					color: 'RANDOM',
					description: `${detail.description}`.replace(/<br>|<b>|<i>|<\/b>|<\/br>|<i>|<\/i>/gm, ' ').slice(0, 1600),
					fields:[
						{
							name:'Type',
							value: `${detail.format}`,
							inline: true,
						},
						{
							name:'Season',
							value: `${detail.season ??= 'N/A'}`,
							inline: true,
						},
						{
							name:'Main Studio',
							value: `${detail.studios.edges[0].node.name}`,
							inline: true,
						},
						{
							name:'Episodes',
							value: `Total: ${detail.episodes ??= 'N/A'}`,
							inline: true,
						},
						{
							name:'Status',
							value: `${detail.status}
						Start Date: ${detail.startDate.year ??= 'NA'}-${detail.startDate.month ??= 'NA'}-${detail.startDate.day ??= 'NA'}
						End Date: ${detail.endDate.year ??= 'NA'}-${detail.endDate.month ??= 'NA'}-${detail.endDate.day ??= 'NA'}`,
							inline: true,
						},
						{
							name:'Title',
							value: `**English:** ${detail.title.english ??= 'N/A'}
						**Romaji:** ${detail.title.userPreferred}
						**Native:** ${detail.title.native}`,
							inline: false,
						},
						{
							name:'Genres',
							value: `${detail.genres.join(', ') }`,
							inline: false,
						},
					],
				});
				return interaction.update({ embeds:[embed] });
			}
			else {
				return interaction.update({ content: `Look like you have another ${this.name} command going on, or the time has passed 15min`, components:[] });
			}
		}
		catch(error) {
			console.warn(error);
			interaction.update('Something went wrong with the execution');
		}
	},
	/**
    * @param {import('discord.js').ButtonInteraction} interaction
    */
	async button(interaction) {
		try {
			const userId = interaction.user.id;
			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT 10',
			});

			const prev = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_prev`,
				emoji: '⏮️',
				label: 'PREV 10',
			});

			const selectMenu = new MessageSelectMenu({
				customId:`${this.name}`,
				placeholder: 'Select an anime to view details',
			});

			const getTrend = aniTrending.get(userId);
			if (getTrend) {
				if (interaction.customId == `${this.name}_next`) {
					aniTendingCount.math(userId, 'add', 10);
					const buttonAction = aniTendingCount.get(userId);
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
							descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${getTrend[i].startDate.year} | ${getTrend[i].title?.english ?? getTrend[i].title.userPreferred}](https://anilist.co/anime/${getTrend[i].id})`);
						}
						const embed = new MessageEmbed({
							color: 'RANDOM',
							description: descArray.join('\n'),
						});
						interaction.update({ content:'\u200b', embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type: 'ACTION_ROW', components: [next, prev] }] });
					}

					else {
						interaction.update({ content: 'End of line', embeds:[], components: [{ type:'ACTION_ROW', components: [prev] }] });
					}
				}

				else if (interaction.customId == `${this.name}_prev`) {
					aniTendingCount.math(userId, 'sub', 10);
					const buttonAction = aniTendingCount.get(userId);
					const descArray = [];
					if (buttonAction < 10) {
						interaction.update({ content: 'End of line', embeds: [], components: [{ type:'ACTION_ROW', components: [next] }] });
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
							descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${getTrend[i].startDate.year} | ${getTrend[i].title?.english ?? getTrend[i].title.userPreferred}](https://anilist.co/anime/${getTrend[i].id})`);
						}
						const embed = new MessageEmbed({
							color: 'RANDOM',
							description: descArray.join('\n'),
						});
						interaction.update({ content:'\u200b', embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type: 'ACTION_ROW', components: [next, prev] }] });
					}
				}
			}
			else {
				return interaction.update({ content: `Look like you have another ${this.name} command going on, or the time has passed 15min`, components:[] });
			}
		}
		catch(error) {
			console.warn(error);
			interaction.update('Something went wrong with the execution');
		}
	},
};