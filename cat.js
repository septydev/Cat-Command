import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const command = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Get a random cute cat 😺'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await res.json();
      const url = data[0]?.url;

      if (!url) {
        await interaction.editReply("😿 Couldn't find a cat right now... Try again later!");
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle('🐱 Random Cute Cat!')
        .setDescription('Here’s a random adorable cat, just for you 💖')
        .setImage(url)
        .setColor('Random')
        .setFooter({ text: 'Made by Septy' })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      await interaction.editReply('❌ Something went wrong fetching a cat 😿');
    }
  }
};
