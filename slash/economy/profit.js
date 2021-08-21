const { Constants } = require('discord.js');
const opt = Constants.ApplicationCommandOptionTypes;
module.exports = {
	name: 'profit',
	description: 'Calculate your profit from selling item(s) to Central Marketplace',
	options: [
		{
			type: opt.NUMBER,
			name:'price',
			description: 'Price for each item sold',
			required:true,
		},
		{
			type: opt.INTEGER,
			name:'quantity',
			description: 'Quantity of sales',
			required:true,
		},
		{
			type: opt.INTEGER,
			name:'fame',
			description: 'Family Fame',
			required:true,
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction Represent CommandInteraction
   */
	async slashcommand(interaction) {

		try {
			await interaction.deferReply({ ephemeral: true });
			let calFame;
			const price = interaction.options.getNumber('price');
			const quantity = interaction.options.getInteger('quantity');
			const fame = interaction.options.getInteger('fame');
			if (fame < 1000) {calFame = 0;}
			if (fame < 4000 && fame > 999) {calFame = (0.00325);}
			if (fame > 3999 && fame < 7000) {calFame = (0.0065);}
			if (fame > 6999) {calFame = (0.00975);}
			const bless = (price * quantity * (0.845 + calFame));
			const nonbless = (price * quantity * (0.65 + calFame));
			const comPrice = price.toLocaleString('en-US');
			const comQuantity = quantity.toLocaleString('en-US');
			const total = (price * quantity).toLocaleString('en-US');
			const resBless = bless.toLocaleString('en-US');
			const resNonBless = nonbless.toLocaleString('en-US');

			const embed = {
				color: 0xC6E2FF,
				title:'Market price calculator',
				fields: [{
					name:'Price of each item: ',
					value:comPrice,
					inline:true,
				},
				{
					name:'Quantity of sale(s): ',
					value:comQuantity,
					inline:true,
				},
				{
					name:'Price without taxes: ',
					value:total,
					inline:true,
				},
				{
					name:'Profit with value pack: ',
					value:resBless,
					inline:true,
				},
				{
					name: 'Profit without value pack: ',
					value:resNonBless,
					inline:true,
				}],
				footer:{ text:'Note: value pack not shown on CMP' },
			};

			interaction.editReply({ embeds:[embed] });
		}
		catch (err) {
			console.error(err);
			interaction.editReply({ content:'Oh No!! Something went wrong' });
		}
	},

};