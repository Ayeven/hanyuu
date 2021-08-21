const c = [{ name:'family', value:'family' }, { name:'character', value:'character' }];
const cheerio = require('cheerio');
const axios = require ('axios').default;
const { encode } = require('html-entities');

module.exports = {
	name: 'psearch',
	description: 'Search player by family/character name',
	options: [
		{
			type: 'STRING',
			name: 'search',
			description: 'family or character name',
			required:true,
			choices:c,
		},
		{
			type: 'STRING',
			name: 'target',
			description: 'Who do you want to search',
			required:true,
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction Represent CommandInteraction
   */
	async slashcommand(interaction) {

		try {
			interaction.deferReply({ ephemeral: true });
			let url = '';
			const query = encode(interaction.options.getString('target'));

			if (interaction.options.getString('search') === 'family') {
				url = `https://www.sea.playblackdesert.com/Adventure?searchType=2&searchKeyword=${query}`;
			}
			else {
				url = `https://www.sea.playblackdesert.com/Adventure?searchType=1&searchKeyword=${query}`;
			}

			const get = axios.create();
			const a = await get.get(url);
			const $ = cheerio.load(a.data);
			const list = $('ul.adventure_list_table>li').slice(1);
			const result = [];

			list.each(function() {
				const fName = $(this).find('div.title').text().trim();
				const main = $(this).find('span.text').text();
				const lvl = $(this).find('span.level').text();
				const cls = $(this).find('span.character_class').text();
				const guild = $(this).find('div.state').text().trim();
				result.push({ name:`Family:${fName}`, value:`**Main:** ${main} **${lvl}**\n**Class:** ${cls}\n**Guild:**${guild}`, inline:true });
			});
			const embed = { color:0xC6E2FF, title:`Search(s) result for: ${query}`, fields:result };

			interaction.editReply({ embeds:[embed] });
		}

		catch (err) {
			interaction.editReply({ content:'Oh No!! Something went wrong' });
			console.error(err);
		}
	},

};