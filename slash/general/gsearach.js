const cheerio = require('cheerio');
const axios = require ('axios').default;
const { encode } = require('html-entities');
const { Constants } = require('discord.js');
const opt = Constants.ApplicationCommandOptionTypes;
module.exports = {
	name: 'gsearch',
	description: 'Search guild by name (SEA)',
	options: [
		{
			type: opt.STRING,
			name:'name',
			description: 'What guild you looking for?',
			required:true,
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction Represent CommandInteraction
   */
	async slashcommand(interaction) {

		try {
			await interaction.deferReply({ ephemeral: true });
			const query = encode(interaction.options.getString('name'));
			const url = `https://www.sea.playblackdesert.com/Adventure/Guild?page=1&searchText=${query}`;
			const fetch = axios.create();
			const a = await fetch.get(url);
			const $ = cheerio.load(a.data);
			const result = [];
			const gName = $('span.text').eq(0).text().trim();
			const gm = $('span.text').eq(1).text().trim();
			const count = $('span.guild_member').eq(0).text();
			const date = $('.date').eq(1).text().trim();
			result.push({ name:`**Guild:** ${gName}`, value:`**GM:** ${gm} **\n**${count}\n**Created on** :${date}`, inline:true });
			const embed = {
				color:0xC6E2FF,
				title:`Guild Search: ${query}`,
				fields:result,
			};

			interaction.editReply({ embeds:[embed] });
		}
		catch (err) {
			interaction.editReply({ content:'Oh No!! Something went wrong' });
			console.error(err);
		}
	},

};