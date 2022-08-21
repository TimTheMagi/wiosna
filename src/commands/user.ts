import { SlashCommandBuilder } from 'discord.js';
import { Player } from 'discord-player';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info'),
	async execute(interaction:any, player?:Player) {
		await interaction.reply('User info');
	},
};