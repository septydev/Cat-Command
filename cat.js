if (interaction.commandName === 'cat') {
  await interaction.deferReply();
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await res.json();
    const url = data[0]?.url;
    if (!url) return interaction.editReply("😿 Couldn't find a cat right now... Try again later!");

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
