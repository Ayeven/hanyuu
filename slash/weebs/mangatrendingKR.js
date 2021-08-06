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
	cooldown: 15,
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
					placeholder:'Select a manga to view more details',
				});

				for (let i = 0; i < 10; i++) {
					descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${trendingArray[i].startDate.year} | ${trendingArray[i].title.userPreferred}](https://anilist.co/manga/${trendingArray[i].id})`);
					selectMenu.addOptions([
						{
							label: `${(i + 1).toString().padStart(2, '0')}) Year : ${trendingArray[i].startDate.year}`,
							description: `${trendingArray[i].title?.english ?? trendingArray[i].title?.userPreferred}`.slice(0, 48),
							value: `${trendingArray[i].id}`,
						},
					]);
				}
				const embed = new MessageEmbed({
					color: 'RANDOM',
					description: descArray.join('\n'),
				});
				return interaction.editReply({ embeds:[embed], components:[{ type: 'ACTION_ROW', components: [selectMenu] }, { type:'ACTION_ROW', components:[next] }] });
			}
		}
		catch(error) {
			console.warn(error);
			interaction.editReply('Something went wrong with the execution');
		}
	},
	/**
    * @param {import('discord.js').SelectMenuInteraction} interaction - Represents a SelectMenu Interaction.
    */
	async selectmenu(interaction) {
		try{
			const userId = interaction.user.id;
			const trending = trendingManhwa.get(userId);
			const details = trending.find(({ id }) => `${id}` == interaction.values[0]);
			const embed = new MessageEmbed({
				title: `${ details.title?.english ?? details.title?.userPreferred}`,
				url: `https://anilist.co/manga/${details.id}`,
				image: { url: `${details.coverImage?.extraLarge ?? details.coverImage?.large}` },
				fields:[
					{
						name: 'Type:',
						value:`${details.type}`,
						inline: true,
					},
					{
						name: `Status: ${details.status}`,
						value:`Chapters: ${details?.chapter ?? 'NA'}\n Volume: ${details?.volumes ?? 'NA'}`,
						inline: true,
					},
					{
						name: `Average Score: ${details.averageScore}%`,
						value:`Popularity: ${details.popularity.toLocaleString()} users`,
						inline: true,
					},
					{
						name: 'Genres:',
						value:`${details.genres.join(', ')}`,
						inline: false,
					},
				],
				color: 'RANDOM',
				description: `${details.description}`.replace(/<br>|<b>|<i>|<\/b>|<\/br>|<i>|<\/i>/gm, ' ').slice(0, 1600),
			});
			return interaction.update({ embeds:[embed] });
		}
		catch(error) {
			console.warn(error);
			interaction.update('Something went wrong with the execution');
		}
	},
	/**
    * @param {import('discord.js').ButtonInteraction} interaction - Represents a Button Interaction.
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
				placeholder: 'Select a manga to view more details',
			});

			const trending = trendingManhwa.get(userId);
			if (interaction.customId == `${this.name}_next`) {
				count.math(userId, 'add', 10);
				const buttonAction = count.get(userId);
				const descArray = [];
				if (buttonAction < 51) {
					for (let i = buttonAction - 10; i < buttonAction; i++) {
						selectMenu.addOptions([
							{
								label: `${(i + 1).toString().padStart(2, '0')}) Year: ${trending[i].startDate.year}`,
								description: `${ trending[i].title?.english ?? trending[i].title.userPreferred}`.slice(0, 48),
								value: `${trending[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${trending[i].startDate.year} | ${ trending[i].title?.english ?? trending[i].title.userPreferred}](https://anilist.co/manga/${trending[i].id})`);
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
				count.math(userId, 'sub', 10);
				const buttonAction = count.get(userId);
				const descArray = [];
				if (buttonAction < 10) {
					interaction.update({ content: 'End of line', embeds: [], components: [{ type:'ACTION_ROW', components: [next] }] });
				}
				else {
					for (let i = buttonAction - 10; i < buttonAction; i++) {
						selectMenu.addOptions([
							{
								label: `${(i + 1).toString().padStart(2, '0')}) Year : ${trending[i].startDate.year}`,
								description: `${trending[i].title?.english ?? trending[i].title.userPreferred}`.slice(0, 48),
								value: `${trending[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${trending[i].startDate.year} | ${trending[i].title?.english ?? trending[i].title.userPreferred}](https://anilist.co/manga/${trending[i].id})`);
					}
					const embed = new MessageEmbed({
						color: 'RANDOM',
						description: descArray.join('\n'),
					});
					interaction.update({ content:'\u200b', embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type: 'ACTION_ROW', components: [next, prev] }] });
				}
			}
		}
		catch(error) {
			console.warn(error);
			interaction.update('Something went wrong with the execution');
		}
	},
};