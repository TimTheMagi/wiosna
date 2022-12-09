import { SlashCommandBuilder } from 'discord.js';
import { Player } from 'discord-player';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops and emptys the queue for the bot.'),
	async execute(interaction:any, player:Player) {
		player.deleteQueue(interaction.guildId);
        
        await interaction.reply("The queue has been emptied.")
	},
};