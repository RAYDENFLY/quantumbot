import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check bot status'),
  async execute(interaction) {
    const embed = {
      title: 'Pong!',
      description: 'Bot is online.',
      color: 0x00ff00,
    };
    await interaction.reply({ embeds: [embed] });
  },
};