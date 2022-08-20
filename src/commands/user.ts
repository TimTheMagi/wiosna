import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info'),
	async execute(interaction:any) {
		await interaction.reply('User info');
	},
};