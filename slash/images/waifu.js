const waifu = require('../../dependancies/image').Waifupic;
module.exports = {
	name: 'waifupic',
	description: 'Get a random waifu fetch/gif from waifu.pics',
	options:[
		{
			type: 'SUB_COMMAND',
			name:'waifu',
			description: 'Get a random fetch/gif from waifu.pics of waifu ',
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
			description: 'Get a random fetch/gif from waifu.pics of neko',
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
			description: 'Get a random fetch/gif from waifu.pics of shinobu',
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
			description: 'Get a random fetch/gif from waifu.pics of megumin',
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
			description: 'Get a random fetch/gif from waifu.pics of bullying',
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
			description: 'Get a random fetch/gif from waifu.pics of cuddle',
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
			description: 'Get a random fetch/gif from waifu.pics of awoo',
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
			description: 'Get a random fetch/gif from waifu.pics of bonk',
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
			description: 'Get a random fetch/gif from waifu.pics of yeet-ing',
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
			description: 'Get a random fetch/gif from waifu.pics of smiling',
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
			description: 'Get a random fetch/gif from waifu.pics of waving',
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
			description: 'Get a random fetch/gif from waifu.pics of highfive',
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
			description: 'Get a random fetch/gif from waifu.pics of handhold',
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
			description: 'Get a random fetch/gif from waifu.pics of glomp',
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
			description: 'Get a random fetch/gif from waifu.pics of happy',
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
			description: 'Get a random fetch/gif from waifu.pics of wink',
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
			description: 'Get a random fetch/gif from waifu.pics of dancing',
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
			description: 'Get a random fetch/gif from waifu.pics of cringe',
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
			const opt = interaction?.options;
			let text = '';
			let fetch;

			if (interaction.options.getSubCommand() == 'waifu') {
				fetch = await waifu.waifu();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'neko') {
				fetch = await waifu.neko();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });

			}

			else if (interaction.options.getSubCommand() == 'shinobu') {
				fetch = await waifu.shinobu();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'megumin') {
				fetch = await waifu.megumin();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'bully') {
				fetch = await waifu.bully();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'cuddle') {
				fetch = await waifu.cuddle();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'awoo') {
				fetch = await waifu.awoo();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'bonk') {
				fetch = await waifu.bonk();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'yeet') {
				fetch = await waifu.yeet();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'smile') {
				fetch = await waifu.smile();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'wave') {
				fetch = await waifu.wave();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });

			}

			else if (interaction.options.getSubCommand() == 'highfive') {
				fetch = await waifu.highfive();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'handhold') {
				fetch = await waifu.handhold();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'glomp') {
				fetch = await waifu.glomp();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}

			else if (interaction.options.getSubCommand() == 'happy') {
				fetch = await waifu.happy();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });

			}

			else if (interaction.options.getSubCommand() == 'wink') {
				fetch = await waifu.wink();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });

			}

			else if (interaction.options.getSubCommand() == 'dance') {
				fetch = await waifu.dance();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}
			else if (interaction.options.getSubCommand() == 'cringe') {
				fetch = await waifu.cringe();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [fetch] })
					: void interaction.editReply({ content:fetch });
			}
		}
		catch (err) {
			console.error(err);
			void interaction.editReply('Something went wrong with this command');
		}
	},
};