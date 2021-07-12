const shiro = require('shiro.gg');

module.exports = {
	name: 'shiro',
	description: 'Get a random image/gif from shiro.gg',
	options:[
		{
			type: 'SUB_COMMAND',
			name:'cry',
			description: 'Get a random image/gif from shiro.gg of crying ',
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
			name:'blush',
			description: 'Get a random image/gif from shiro.gg of blush',
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
			name:'hug',
			description: 'Get a random image/gif from shiro.gg of hugging',
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
			name:'kiss',
			description: 'Get a random image/gif from shiro.gg of kissing',
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
			name:'lick',
			description: 'Get a random image/gif from shiro.gg of licking',
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
			name:'nom',
			description: 'Get a random image/gif from shiro.gg of eating',
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
			name:'pat',
			description: 'Get a random image/gif from shiro.gg of patting',
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
			name:'poke',
			description: 'Get a random image/gif from shiro.gg of poking',
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
			name:'pout',
			description: 'Get a random image/gif from shiro.gg of pouting',
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
			name:'punch',
			description: 'Get a random image/gif from shiro.gg of punching',
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
			name:'slap',
			description: 'Get a random image/gif from shiro.gg of slapping',
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
			name:'sleep',
			description: 'Get a random image/gif from shiro.gg of sleep',
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
			name:'smug',
			description: 'Get a random image/gif from shiro.gg of smug',
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
			name:'tickle',
			description: 'Get a random image/gif from shiro.gg of tickling',
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
			if (interaction.options.get('cry')) {
				image = await shiro.cry();
				text = opt.get('cry').options?.get('text').value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('blush')) {
				image = await shiro.blush();
				text = opt.get('blush').options?.get('text').value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('hug')) {
				image = await shiro.hug();
				text = opt.get('hug').options?.get('text').value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('kiss')) {
				image = await shiro.kiss();
				text = opt.get('kiss').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('lick')) {
				image = await shiro.lick();
				text = opt.get('lick').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('nom')) {
				image = await shiro.nom();
				text = opt.get('nom').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('pat')) {
				image = await shiro.pat();
				text = opt.get('pat').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('poke')) {
				image = await shiro.poke();
				text = opt.get('poke').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('pout')) {
				image = await shiro.pout();
				text = opt.get('pout').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('punch')) {
				image = await shiro.punch();
				text = opt.get('punch').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('slap')) {
				image = await shiro.slap();
				text = opt.get('slap').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('sleep')) {
				image = await shiro.sleep();
				text = opt.get('sleep').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('smug')) {
				image = await shiro.smug();
				text = opt.get('smug').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
			else if (interaction.options.get('tickle')) {
				image = await shiro.tickle();
				text = opt.get('tickle').options?.get('text')?.value;
				opt ? void interaction.editReply({ content: text, files: [image.url] })
					: void interaction.editReply({ content:image.url });
			}
		}
		catch (err) {
			console.error(err);
			void interaction.editReply('Something went wrong with this command');
		}
	},
};