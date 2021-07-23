const { Satou } = require('../../dependancies/image');
const opt = require('discord-api-types/v9').ApplicationCommandOptionType;
module.exports = {
	name: 'satou',
	description: 'Get some random images/gif from satou.xyz',
	cooldown : 10,
	options: [
		{
			type: opt.SubCommand,
			name : 'angry',
			description: 'Get some random images/gif of angry from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'bite',
			description: 'Get some random images/gif of bite from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'bored',
			description: 'Get some random images/gif of bored from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'bread',
			description: 'Get some random images/gif of bread from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'chocolate',
			description: 'Get some random images/gif of chocolate from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'cookie',
			description: 'Get some random images/gif of cookie from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'cuddle',
			description: 'Get some random images/gif of cuddle from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'dance',
			description: 'Get some random images/gif of dance from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'drunk',
			description: 'Get some random images/gif of drunk from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'happy',
			description: 'Get some random images/gif of happy from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'kill',
			description: 'Get some random images/gif of kill from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'kiss',
			description: 'Get some random images/gif of kiss from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'laugh',
			description: 'Get some random images/gif of laugh from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'lick',
			description: 'Get some random images/gif of lick from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'lonely',
			description: 'Get some random images/gif of lonely from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'pat',
			description: 'Get some random images/gif of patting from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'poke',
			description: 'Get some random images/gif of poking from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'pregnant',
			description: 'Get some random images/gif of pregnant from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'punch',
			description: 'Get some random images/gif of punching from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'run',
			description: 'Get some random images/gif of running from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'sleep',
			description: 'Get some random images/gif of sleeping from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'spank',
			description: 'Get some random images/gif of spanking from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'spit',
			description: 'Get some random images/gif of spitting from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'steal',
			description: 'Get some random images/gif of stealing from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SubCommand,
			name : 'tickle',
			description: 'Get some random images/gif of tickling from satou.xyz',
			options: [
				{
					type: opt.String,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
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
			const option = interaction?.options;

			if(option.getSubCommand() == 'angry') {
				const image = await new Satou().angry();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'bite') {
				const image = await new Satou().bite();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'bored') {
				const image = await new Satou().bored();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'bread') {
				const image = await new Satou().bread();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'chocolate') {
				const image = await new Satou().chocolate();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'cookie') {
				const image = await new Satou().cookie();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'cuddle') {
				const image = await new Satou().cuddle();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'dance') {
				const image = await new Satou().dance();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'drunk') {
				const image = await new Satou().drunk();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'happy') {
				const image = await new Satou().happy();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'kill') {
				const image = await new Satou().kill();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'kiss') {
				const image = await new Satou().kiss();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'laugh') {
				const image = await new Satou().laugh();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'lick') {
				const image = await new Satou().lick();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'lonely') {
				const image = await new Satou().lonely();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'pat') {
				const image = await new Satou().pat();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'poke') {
				const image = await new Satou().poke();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'pregnant') {
				const image = await new Satou().pregnant();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'punch') {
				const image = await new Satou().punch();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'run') {
				const image = await new Satou().run();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'sleep') {
				const image = await new Satou().sleep();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'spank') {
				const image = await new Satou().spank();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'spit') {
				const image = await new Satou().spit();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'steal') {
				const image = await new Satou().steal();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}

			else if(option.getSubCommand() == 'tickle') {
				const image = await new Satou().tickle();
				if (image == 'Something bad happen when trying to fetch data from server!') {
					return interaction.editReply(image);
				}
				else {
					const text = option.getString('text');
					text ? interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				}
			}
		}
		catch(error) {
			console.error(error);
			void interaction.editReply('Something went wrong with this command');
		}
	},
};