import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Cek status submission')
    .addStringOption(option =>
      option.setName('id')
        .setDescription('Submission ID')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Type: signal, research, learning, academy')
        .setRequired(true)
        .addChoices(
          { name: 'signal', value: 'signal' },
          { name: 'research', value: 'research' },
          { name: 'learning', value: 'learning' },
          { name: 'academy', value: 'academy' }
        )),
  async execute(interaction) {
    const id = interaction.options.getString('id');
    const type = interaction.options.getString('type');

    try {
      const response = await axios.get(`${process.env.API_BASE_URL}/api/${type}`);
      const items = response.data;
      const item = items.find(i => i._id === id);
      if (item) {
        const embed = {
          title: 'Submission Status',
          fields: [
            { name: 'ID', value: id, inline: true },
            { name: 'Type', value: type, inline: true },
            { name: 'Status', value: item.status, inline: true },
          ],
          color: 0x0099ff,
        };
        await interaction.reply({ embeds: [embed] });
      } else {
        const embed = {
          title: 'Error',
          description: 'Submission not found.',
          color: 0xff0000,
        };
        await interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      const embed = {
        title: 'Error',
        description: 'Error fetching status.',
        color: 0xff0000,
      };
      await interaction.reply({ embeds: [embed] });
    }
  },
};