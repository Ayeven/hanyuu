const axios = require('axios').default;
const waifu = axios.create({
	baseURL: 'https://api.waifu.pics',
});
module.exports = {
	name: 'waifupic',
	description: 'Get a random waifu image/gif from waifu.pics',
	options:[
		{
			type: 'SUB_COMMAND',
			name:'waifu',
			description: 'Get a random image/gif from waifu.pics of waifu ',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'neko',
			description: 'Get a random image/gif from waifu.pics of neko',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'shinobu',
			description: 'Get a random image/gif from waifu.pics of shinobu',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'megumin',
			description: 'Get a random image/gif from waifu.pics of megumin',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'bully',
			description: 'Get a random image/gif from waifu.pics of bullying',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'cuddle',
			description: 'Get a random image/gif from waifu.pics of cuddle',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'awoo',
			description: 'Get a random image/gif from waifu.pics of awoo',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'bonk',
			description: 'Get a random image/gif from waifu.pics of bonk',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'yeet',
			description: 'Get a random image/gif from waifu.pics of yeet-ing',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'smile',
			description: 'Get a random image/gif from waifu.pics of smiling',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'wave',
			description: 'Get a random image/gif from waifu.pics of waving',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'highfive',
			description: 'Get a random image/gif from waifu.pics of highfive',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'handhold',
			description: 'Get a random image/gif from waifu.pics of handhold',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'glomp',
			description: 'Get a random image/gif from waifu.pics of glomp',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'happy',
			description: 'Get a random image/gif from waifu.pics of happy',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'wink',
			description: 'Get a random image/gif from waifu.pics of wink',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'dance',
			description: 'Get a random image/gif from waifu.pics of dancing',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'cringe',
			description: 'Get a random image/gif from waifu.pics of cringe',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async run(interaction) {
		try {
			await interaction.defer();
			let image;
			const opt = interaction?.options;
			let text;
			let fetch;
			if (interaction.options.getSubCommand('waifu') == 'waifu') {
				fetch = await waifu.get('sfw/waifu')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('neko') == 'neko') {
				fetch = await waifu.get('sfw/neko')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('shinobu') == 'shinobu') {
				fetch = await waifu.get('sfw/shinobu')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('megumin') == 'megumin') {
				fetch = await waifu.get('sfw/megumin')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('bully') == 'bully') {
				fetch = await waifu.get('sfw/bully')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('cuddle') == 'cuddle') {
				fetch = await waifu.get('sfw/cuddle')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('awoo') == 'awoo') {
				fetch = await waifu.get('sfw/awoo')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('bonk') == 'bonk') {
				fetch = await waifu.get('sfw/shinobu')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('yeet') == 'yeet') {
				fetch = await waifu.get('sfw/yeet')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('smile') == 'smile') {
				fetch = await waifu.get('sfw/smile')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('wave') == 'wave') {
				fetch = await waifu.get('sfw/wave')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('highfive') == 'highfive') {
				fetch = await waifu.get('sfw/highfive')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('handhold') == 'handhold') {
				fetch = await waifu.get('sfw/handhold')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('glomp') == 'glomp') {
				fetch = await waifu.get('sfw/glomp')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('happy') == 'happy') {
				fetch = await waifu.get('sfw/happy')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('wink') == 'wink') {
				fetch = await waifu.get('sfw/wink')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('dance') == 'dance') {
				fetch = await waifu.get('sfw/dance')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
			else if (interaction.options.getSubCommand('cringe') == 'cringe') {
				fetch = await waifu.get('sfw/cringe')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!fetch || !fetch?.data) { return interaction.followUp('No data found or server is down');}
				else {
					image = fetch.data;
					text = opt.getString('text');
					opt ? void interaction.editReply({ content: text, files: [image.url] })
						: void interaction.editReply({ content:image.url });
				}
			}
		}
		catch (err) {
			console.error(err);
			void interaction.editReply('Something went wrong with this command');
		}
	},
};