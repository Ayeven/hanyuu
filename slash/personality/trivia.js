const { Trivia, Type, Diff, Category } = require('../../dependancies/trivia');
const { MessageEmbed, MessageSelectMenu, Constants } = require('discord.js');
const { decode } = require('html-entities');
const { trivia } = require('../../dependancies/database');
const optiontype = Constants.ApplicationCommandOptionTypes;
const catChoices = [
	{ name: 'arts', value: Category.arts },
	{ name: 'board_games', value: Category.board_games },
	{ name: 'books', value: Category.books },
	{ name: 'cartoon_animation', value: Category.cartoon_animation },
	{ name: 'celebrities', value: Category.celebrities },
	{ name: 'comics', value: Category.ent_comics },
	{ name: 'films', value: Category.ent_films },
	{ name: 'general_knowledge', value: Category.general_knowledge },
	{ name: 'geography', value: Category.geography },
	{ name: 'history', value: Category.history },
	{ name: 'musical_theather', value: Category.musical_theather },
	{ name: 'musics', value: Category.musics },
	{ name: 'mythology', value: Category.mythology },
	{ name: 'politics', value: Category.politics },
	{ name: 'science_computers', value: Category.science_computers },
	{ name: 'science_gadgets', value: Category.science_gadgets },
	{ name: 'science_mathematics', value: Category.science_mathematics },
	{ name: 'science_nature', value: Category.science_nature },
	{ name: 'sports', value: Category.sports },
	{ name: 'tv', value: Category.tv },
	{ name: 'vehicles', value: Category.vehicles },
	{ name: 'video_games', value: Category.video_games },
	{ name: 'animals', value: Category.animals },
	{ name: 'anime_manga', value: Category.anime_manga },
];

const typeChoices = [
	{ name: Type.mulitple, value: Type.mulitple },
	{ name: Type.true_false, value: Type.true_false },
];

const diffChoices = [
	{ name: Diff.easy, value: Diff.easy },
	{ name: Diff.hard, value: Diff.hard },
	{ name: Diff.medium, value: Diff.medium },
];
module.exports = {
	name: 'trivia',
	description: 'Let have some trivia question',
	cooldown : 5,
	options: [
		{
			type: optiontype.INTEGER,
			name : 'category',
			description : 'Select any of the Category',
			choices : catChoices,
		},
		{
			type: optiontype.STRING,
			name : 'type',
			description : 'Select any of the type',
			choices : typeChoices,
		},
		{
			type: optiontype.STRING,
			name : 'difficulty',
			description : 'Select any of the difficulty',
			choices : diffChoices,
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction - Represents a Command Interaction
   */
	async slashcommand(interaction) {
		try {
			await interaction.deferReply({ ephemeral: true });
			const category = interaction.options.getInteger('category') ?? null;
			const difficulty = interaction.options.getString('difficulty') ?? null;
			const type = interaction.options.getString('type') ?? null;
			const userId = interaction.user.id;
			const question = await Trivia.getOne({ category, difficulty, type });
			const selectAnswer = new MessageSelectMenu({
				customId: `${this.name}`,
				placeholder: 'Choose the right answer',
				minValues: 1,
				maxValues: 1,
			});

			if (typeof question === 'string') { return interaction.followUp(question);}

			else {

				const answers = question.result.incorrect;
				answers.push(question.result.correct);
				answers.sort(() => Math.random() - 0.5);
				for (let n = 0; n < answers.length; n++) {
					selectAnswer.addOptions([
						{
							label: `Options : ${n + 1}`,
							description: `${decode(answers[n])}`.slice(0, 48),
							value: `${decode(answers[n])}`,
						},
					]);
				}
				const embed = new MessageEmbed({
					color: 'RANDOM',
					timestamp: new Date(),
					fields: [
						{
							name: 'Type: ',
							value: question.result.type,
							inline: true,
						},
						{
							name: 'Difficulty: ',
							value: question.result.difficulty,
							inline: true,
						},
						{
							name: 'Category: ',
							value: question.result.category,
							inline: true,
						},
					],
					description: `**Question:**\n\n${question.result.question}`,
				});
				trivia.set(`${userId}`, question.result.correct);
				return interaction.editReply({ embeds: [embed], components: [{ type:'ACTION_ROW', components: [selectAnswer] }] });
			}

		}
		catch (err) {console.error(err);}
	},
	/**
     * @param {import('discord.js').SelectMenuInteraction} interaction - Represents a SelectMenu Interaction.
     */
	async selectmenu(interaction) {
		const userId = interaction.user.id;
		const correct = await trivia.get(`${userId}`);
		if (interaction.values[0] == correct) {
			trivia.evict(userId);
			trivia.delete(`${userId}`);
			interaction.update({ content:'You got correct answer, congratulation', components: [], embeds: [] });
		}
		else if(interaction.values[0] !== correct) {
			trivia.evict(userId);
			trivia.delete(`${userId}`);
			interaction.update({ content:'You got the wrong answer! Better luck next time', components: [], embeds: [] });
		}
	},
};