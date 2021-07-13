const { Anime } = require('../../dependancies/anime');
const { MessageEmbed, MessageSelectMenu } = require('discord.js');
const c = [{ name:'spring', value:'spring' }, { name:'summer', value:'summer' }, { name:'fall', value:'fall' }, { name:'winter', value:'winter' }];
const moment = require('moment');
const y = [
	{
		name:`${moment().year() - 10}`, value:`${moment().year() - 10}`,
	},
	{
		name:`${moment().year() - 9}`, value:`${moment().year() - 9}`,
	},
	{
		name:`${moment().year() - 8}`, value:`${moment().year() - 8}`,
	},
	{
		name:`${moment().year() - 7}`, value:`${moment().year() - 7}`,
	},
	{
		name:`${moment().year() - 6}`, value:`${moment().year() - 6}`,
	},
	{
		name:`${moment().year() - 5}`, value:`${moment().year() - 5}`,
	},
	{
		name:`${moment().year() - 4}`, value:`${moment().year() - 4}`,
	},
	{
		name:`${moment().year() - 3}`, value:`${moment().year() - 3}`,
	},
	{
		name:`${moment().year() - 2}`, value:`${moment().year() - 2}`,
	},
	{
		name:`${moment().year() - 1}`, value:`${moment().year() - 1}`,
	},
	{
		name:`${moment().year()}`, value:`${moment().year()}`,
	},
];
module.exports = {
	name: 'animeseason',
	description: 'Search for seasonal anime(s)',
	cooldown: 10,
	options:[
		{
			type: 'STRING',
			name:'season',
			description: 'The season choices',
			required: true,
			choices:c,
		},
		{
			type: 'STRING',
			name:'year',
			description: 'Which year of seasonal anime',
			required: true,
			choices: y,
		},
		{
			type: 'INTEGER',
			name:'page',
			description: 'Pages of result',
			choices: [{ name: '1', value: 1 }, { name: '2', value: 2 }, { name: '3', value: 3 }],
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async run(interaction) {
		try {
			await interaction.defer();
			const season = interaction.options.get('season').value;
			const year = Number(interaction.options.get('year').value);
			const page = interaction.options.get('page')?.value;
			const fetch = await Anime.getSeason({ year, season, page });


			const descArray = [];

			const selectMenu = new MessageSelectMenu({
				customId: `${this.name}`,
				placeholder:'Pick an anime to view details',
			});
			if (fetch.size == 0 || fetch == 'No data found') {
				return interaction.followUp('No anime(s) with that query found/ No query for that page');
			}
			else {
				let n = 0;
				fetch.each((value, key)=>{
					n++;
					descArray.push(`${n.toString().padStart(2, '0')}.\t[${value.status} | ${value.title}](${value.url})`);
					selectMenu.addOptions([
						{
							label: `${n.toString().padStart(2, 0)})\t ID: ${key}`,
							description: `${value.title}`.slice(0, 48),
							value: `${key}`,
						},
					]);
				});
			}

			const embed = new MessageEmbed({
				color: 'RANDOM',
				title: `Search Result(s) : ${season.toUpperCase()} ${year}`,
				description: descArray.join('\n'),
			});

			await interaction.followUp({ embeds:[embed], components: [{ type:'ACTION_ROW', components: [selectMenu] }] });
		}
		catch (err) {
			console.error(err);
			return interaction.editReply('Something went wrong with this command');
		}

	},
	/**
     * @param {import('discord.js').SelectMenuInteraction} interaction - Represents a SelectMenu Interaction.
     */
	async selectmenu(interaction) {
		try {
			await interaction.deferUpdate();
			const result = await Anime.getAnimeID(interaction.values[0]);
			const embed = new MessageEmbed({
				title: `ID: ${result.mal_id} ${result.title}`,
				color:'RANDOM',
				description:result.synopsis,
				fields:[
					{
						name:`Type: ${result.type}`,
						value:`Status: ${result.status}`,
						inline:true,
					},
					{
						name:'Rating',
						value:`${result.rating}`,
						inline:true,
					},
					{
						name:'Episodes: ',
						value:`Total epsidodes: ${result.episodes}\n${result.duration}`,
						inline:true,
					},
					{
						name:'English Title: ',
						value:`${result?.title_english ?? 'NO RECORDS'}`,
						inline:true,
					},
					{
						name:'Japanese Title: ',
						value:`${result?.title_japanese ?? 'NO RECORDS'}`,
						inline:true,
					},
				],
				url:result?.url,
				thumbnail: { url:result.images },
			});
			return interaction.followUp({ embeds:[embed], components : [] });
		}
		catch (error) {
			console.warn(error);
			return interaction.followUp('Failed to execute Select Menu Interaction');
		}
	},
};