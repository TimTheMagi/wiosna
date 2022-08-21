import { SlashCommandBuilder, Interaction } from 'discord.js';
import { Player } from 'discord-player';

module.exports = {
    data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays audio through the discord bot!')
        .addStringOption(option => option.setName('query')
        .setDescription('The video/audio to play')
        .setRequired(true)),
	async execute(interaction:any, player:Player) {
		if (!interaction.member.voice.channelId){
            return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        }
        //if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        let query = interaction.options.getString('query');
        let queue = player.createQueue(interaction.guild, {
            metadata: {channel: interaction.channel}
        });
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();

        let track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` })


        queue.addTrack(track);
        if (!queue.playing) await queue.play();

        await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });

	},
}