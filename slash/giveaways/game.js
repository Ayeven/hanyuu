const { Giveaway, Type, Platform, Sort } = require('../../dependancies/giveaway.js');
const { MessageEmbed, MessageSelectMenu, Constants } = require('discord.js');
const opt = Constants.ApplicationCommandOptionTypes;
const Enmap = require('enmap');
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
	cooldown: 10,
	options: [
		{
			type: opt.SUB_COMMAND,
			name:'giveaway',
			description: 'Get up to 25 games giveaway by platform, type and sorted by',
			options: [
				{
					type: opt.STRING,
					name: 'platform',
					description: 'Game platform',
					choices: platforms,
					required: true,
				},
				{
					type: opt.STRING,
					name: 'type',
					description:'type of giveaway',
					choices: type,
					required: true,
				},
				{
					type: opt.STRING,
					name: 'sort',
					description: 'Sorted by?',
					choices: sort,
					required: true,
				},
			],
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction Represent CommandInteraction
   */
	async slashcommand(interaction) {
		try {
			await interaction.deferReply({ ephemeral:true });
			if (interaction.options.getSubcommand() == 'giveaway') {
				const platform = interaction.options.getString('platform');
				const t = interaction.options.getString('type');
				const s = interaction.options.getString('sort');
				const userId = interaction.user.id;
				const giveaway = await Giveaway.giveaway(userId, { platform, type : t, sort: s });
				const selectMenu = new MessageSelectMenu({
					customId:`${this.name}`,
					placeholder: 'Select a giveaway to view it details',
				});

				if (
					giveaway == 'No active giveaways available at the moment, please try again later.'
                    || giveaway == 'Object not found: Giveaway or endpoint not found.'
                    || giveaway == 'Something wrong on gamepower.com end (unexpected server errors)'
					|| giveaway == 'Bad input or something unexpected happened'
				) { interaction.editReply(giveaway); }

				else {
					const descArray = [];
					const resultCollection = giveaway.get(userId);
					for (let n = 0; n < resultCollection.length; n++) {
						descArray.push(` [${(n + 1).toString().padStart(2, '0')}) ${resultCollection[n].title}](${resultCollection[n].open_giveaway})`);
						selectMenu.addOptions([
							{
								label: `${(n + 1).toString().padStart(2, '0')}) Deal ID : ${resultCollection[n].id}`,
								description: `${resultCollection[n].title}`.slice(0, 48),
								value: `${resultCollection[n].id}`,
							},
						]);
					}
					const embed = new MessageEmbed({
						title: `${platform} ${t}`.toUpperCase(),
						color:'RANDOM',
						description: descArray.join('\n'),
					});
					await interaction.editReply({ embeds:[embed], components: [{ type:'ACTION_ROW', components: [selectMenu] }] });
				}
			}
		}
		catch (err) {
			interaction.editReply({ content:'Oh No!! Something went wrong' });
			console.error(err);
		}
	},
	/**
 	*
 	* @param {import('discord.js').SelectMenuInteraction} interaction
 	*/
	async selectmenu(interaction) {
		try {
			const giveawayId = interaction.values[0];
			const userId = `${interaction.user.id}`;
			/**
			 * @type {Enmap<userId,Array>}
			 */
			const collection = new Enmap({ name: 'giveaway', dataDir: './data/giveaway', fetchAll: false, autoFetch: true });
			const arrays = collection.get(userId);
			const userRequst = arrays.find(({ id }) => id == giveawayId);

			const embed = new MessageEmbed({
				color : 'RANDOM',
				thumbnail: { url: userRequst.thumbnail },
				title : `${userRequst.title}`,
				description : `**Descriptions :** \n${userRequst.description}\n\n**Instructions:**\n ${userRequst.instruction}`,
				fields : [
					{
						name :'Worth in USD : ',
						value : userRequst.worth,
						inline : true,
					},
					{
						name :'Type : ',
						value : userRequst.type,
						inline : true,
					},
					{
						name :'End Date : ',
						value : userRequst.end_date,
						inline : true,
					},
					{
						name :'Platforms : ',
						value : userRequst.platform,
						inline : true,
					},
					{
						name :'Giveaway Status : ',
						value : userRequst.status,
						inline : true,
					},
				],
			});
			interaction.update({ embeds:[embed] });
		}
		catch (error) {
			interaction.editReply({ content:'Oh No!! Something went wrong' });
			console.warn(error);
		}
	},

};