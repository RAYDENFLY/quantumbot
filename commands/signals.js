import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
  data: new SlashCommandBuilder()
    .setName('signals')
    .setDescription('Lihat signals terbaru hanya yang masih running'),
  async execute(interaction) {
    try {
      const response = await axios.get(`${process.env.API_BASE_URL}/api/signals?status=running`);
      const signals = response.data;
      let description = 'Running Signals:\n';
      signals.forEach(signal => {
        description += `ID: ${signal._id}, Author: ${signal.author}, SL: ${signal.sl}, TP1: ${signal.tp1}\n`;
      });
      if (signals.length === 0) description = 'No running signals.';
      const embed = {
        title: 'Running Signals',
        description,
        color: 0x0099ff,
      };
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const embed = {
        title: 'Error',
        description: 'Error fetching signals.',
        color: 0xff0000,
      };
      await interaction.reply({ embeds: [embed] });
    }
  },
};