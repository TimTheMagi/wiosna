import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info'),
	async execute(interaction:any) {
		await interaction.reply('Server info');
	},
};