const { Giveaway, Type, Platform, Sort } = require('../../dependancies/giveaway');
const { MessageEmbed, MessageSelectMenu } = require('discord.js');
const platforms = [
	{ name:Platform.android, value:Platform.android },
	{ name:Platform.battlenet, value:Platform.battlenet },
	{ name:Platform.egs, value: Platform.egs },
	{ name:Platform.drm_free, value: Platform.drm_free },
	{ name:Platform.gog, value: Platform.gog },
	{ name:Platform.ios, value: Platform.ios },
	{ name:Platform.itchio, value: Platform.itchio },
	{ name:Platform.origin, value: Platform.origin },
	{ name:Platform.pc, value: Platform.pc },
	{ name:Platform.ps4, value: Platform.ps4 },
	{ name:Platform.steam, value: Platform.steam },
	{ name:Platform.switch, value: Platform.switch },
	{ name:Platform.ubisoft, value: Platform.ubisoft },
	{ name:Platform.vr, value: Platform.vr },
	{ name:Platform.xbox1, value: Platform.xbox1 },
];

const type = [
	{ name:Type.beta, value:Type.beta },
	{ name:Type.loot, value:Type.loot },
	{ name:Type.game, value:Type.game },
];

const sort = [
	{ name:Sort.date, value:Sort.date },
	{ name:Sort.popularity, value:Sort.popularity },
	{ name:Sort.value, value:Sort.value },
];

module.exports = {
	name: 'game',
	description: 'Give you game giveaway(s)',
	options: [
		{
			type: 'SUB_COMMAND',
			name:'giveaway',
			description: 'Get up to 25 games giveaway by platform, type and sorted by',
			options: [
				{
					type: 'STRING',
					name: 'platform',
					description: 'Game platform',
					choices: platforms,
					required: true,
				},
				{
					type: 'STRING',
					name: 'type',
					description:'type of giveaway',
					choices: type,
					required: true,
				},
				{
					type: 'STRING',
					name: 'sort',
					description: 'Sorted by?',
					choices: sort,
					required: true,
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'filter',
			description: 'Filter & group platforms and giveaway types to get personalized up to 25 results',
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction Represent CommandInteraction
   */
	async run(interaction) {
		try {
			await interaction.defer();
			if (interaction.options.get('giveaway')) {
				const platform = interaction.options.get('giveaway').options.get('platform').value;
				const t = interaction.options.get('giveaway').options.get('type').value;
				const s = interaction.options.get('giveaway').options.get('sort').value;
				const giveaway = await Giveaway.giveaway({ platform, type : t, sort: s });
				const selectMenu = new MessageSelectMenu({
					customId:`${this.name}`,
					placeholder: 'Pick a giveaway to view it details',
				});

				if (
					giveaway == 'No active giveaways available at the moment, please try again later.'
                    || giveaway == 'Object not found: Giveaway or endpoint not found.'
                    || giveaway == 'Something wrong on gamepower.com end (unexpected server errors)'
					|| giveaway == 'Bad input or something unexpected happened'
				) { void interaction.followUp(giveaway); }

				else {
					let n = 0;
					const descArray = [];
					const resultCollection = giveaway.result;
					resultCollection.each((value, key)=> {
						n++;
						descArray.push(` [${n.toString().padStart(2, '0')}) ${value.title}](${value.open_giveaway})`);
						selectMenu.addOptions([
							{
								label: `ID: ${key}`,
								description: `${value.title}`.slice(0, 48),
								value: `${key}`,
							},
						]);
					});
					const embed = new MessageEmbed({
						title: `${platform} ${t}`.toUpperCase(),
						color:'RANDOM',
						description: descArray.join('\n'),
					});
					await interaction.followUp({ embeds:[embed], components:[[selectMenu]] });
					void resultCollection.clear();
				}
			}
			else {
				return interaction.followUp('Yolo');
			}
		}
		catch (err) {
			interaction.followUp({ content:'Oh No!! Something went wrong' });
			console.error(err);
		}
	},
	/**
 	*
 	* @param {import('discord.js').SelectMenuInteraction} interaction
 	*/
	async selectmenu(interaction) {
		try {
			await interaction.defer();
			const id = interaction.values[0];
			const getDetail = await Giveaway.getbyId(id);
			if (
				getDetail == 'Bad input or something unexpected happened'
				|| getDetail == 'No active giveaways available at the moment, please try again later.'
				|| getDetail == 'Object not found: Giveaway or endpoint not found.'
				|| getDetail == 'Something wrong on gamepower.com end (unexpected server errors)'
			) {void interaction.followUp(getDetail);}
			else {
				const embed = new MessageEmbed({
					color : 'RANDOM',
					thumbnail : { url : getDetail.thumbnail },
					title : `Details for ${getDetail.id}: ${getDetail.title}`,
					description : `Descriptions : \n${getDetail.description}\n\nInstructions:\n ${getDetail.instruction}`,
					fields : [
						{
							name :'Worth in USD : ',
							value : getDetail.worth,
							inline : true,
						},
						{
							name :'Type : ',
							value : getDetail.type,
							inline : true,
						},
						{
							name :'End Date : ',
							value : getDetail.end_date,
							inline : true,
						},
						{
							name :'Platforms : ',
							value : getDetail.platform,
							inline : true,
						},
						{
							name :'Giveaway Status : ',
							value : getDetail.status,
							inline : true,
						},
					],
				});
				void interaction.followUp({ embeds:[embed], components: [] });
			}
		}
		catch (error) {
			interaction.followUp({ content:'Oh No!! Something went wrong' });
			console.warn(error);
		}
	},

};