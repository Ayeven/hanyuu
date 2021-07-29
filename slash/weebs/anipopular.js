// eslint-disable-next-line no-unused-vars
const { Anilist, animedata } = require('../../dependancies/anilist');
const { MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const animePopular = require('../../dependancies/database');
/**
 * @type {import('enmap')<string|number|`${bigint}`, animedata> }
 */
const aniPopular = animePopular.aniPopular;
/**
 * @type {import('enmap')<string|number|`${bigint}`, number> }
 */
const count = animePopular.aniPopularCount;
module.exports = {
	name: 'anipopular',
	description: 'Anilist popular anime(s) up to 50 result',
	cooldown: 10,
	/**
   	* @param {import('discord.js').CommandInteraction} interaction
   	*/
	async run(interaction) {
		try {
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
			const popular = await new Anilist().getPopularAnime();
			if (popular == 'no data found or unexpected server error!') {
				return interaction.editReply(popular);
			}
			else {
				aniPopular.set(userId, popular);
				count.set(userId, 10);
				const arrayPopular = aniPopular.get(userId);
				const descArray = [];
				const selectMenu = new MessageSelectMenu({
					customId:`${this.name}`,
					placeholder: 'Select an anime to view details',
				});
				for (let i = 0; i < 10; i++) {
					selectMenu.addOptions([
						{
							label: `${(i + 1).toString().padStart(2, '0')}) Year : ${arrayPopular[i].startDate.year}`,
							description: `${arrayPopular[i].title.userPreferred}`.slice(0, 48),
							value: `${arrayPopular[i].id}`,
						},
					]);
					descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${arrayPopular[i].title.userPreferred}](https://anilist.co/anime/${arrayPopular[i].id})`);
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
		try {
			await interaction.deferUpdate();
			const userId = interaction.user.id;
			const getPopular = aniPopular.get(userId);
			const details = getPopular.find(({ id }) => `${id}` == interaction.values[0]);
			const embed = new MessageEmbed({
				title: `${details.title.userPreferred}`,
				url: `https://anilist.co/anime/${details.id}`,
				image: { url: `${details.coverImage?.extraLarge ?? details.coverImage?.large}` },
				color: 'RANDOM',
				description: `${details.description}`.replace(/<br>|<b>|<i>|<\/b>|<\/br>|<i>|<\/i>/gm, ' ').slice(0, 1600),
			});
			return interaction.editReply({ embeds:[embed] });
		}
		catch (error) {
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

			const getPopular = aniPopular.get(userId);
			if(interaction.customId == `${this.name}_next` && interaction.user.id === interaction.message.interaction.user.id) {
				count.math(userId, 'add', 10);
				const buttonAction = count.get(userId);
				const descArray = [];
				if (buttonAction < 51) {
					for (let i = buttonAction - 10; i < buttonAction; i++) {
						selectMenu.addOptions([
							{
								label: `${(i + 1).toString().padStart(2, '0')} Year : ${getPopular[i].startDate.year}`,
								description: `${getPopular[i].title.userPreferred}`.slice(0, 48),
								value: `${getPopular[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${getPopular[i].startDate.year} ${getPopular[i].title.userPreferred}](https://anilist.co/anime/${getPopular[i].id})`);
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
								label: `${(i + 1).toString().padStart(2, '0')} Year : ${getPopular[i].startDate.year}`,
								description: `${getPopular[i].title.userPreferred}`.slice(0, 48),
								value: `${getPopular[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${getPopular[i].startDate.year} ${getPopular[i].title.userPreferred}](https://anilist.co/anime/${getPopular[i].id})`);
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