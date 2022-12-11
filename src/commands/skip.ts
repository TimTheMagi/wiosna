import { SlashCommandBuilder } from 'discord.js';
import { Player } from 'discord-player';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current track.'),
	async execute(interaction:any, player:Player) {
		let queue = player.getQueue(interaction.guildId);
		let np = queue?.nowPlaying()

		let response = "There is nothing currently playing."

		if (np != undefined){
			response = `**Skipped:** ${np.title.toString()}`
			queue?.skip()
		}
        
        await interaction.reply(response)
	},
};