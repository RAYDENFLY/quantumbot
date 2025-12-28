import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import axios from 'axios';

export default {
  data: new SlashCommandBuilder()
    .setName('signallist')
    .setDescription('Lihat semua signals dari database dengan pagination'),
  async execute(interaction) {
    try {
      const response = await axios.get(`${process.env.API_BASE_URL}/api/signals`);
      const signals = response.data.filter(s => s.status === 'approved' || s.status === 'running' || s.status === 'closed');
      if (signals.length === 0) {
        return interaction.reply('No signals found.');
      }

      const pageSize = 5;
      let currentPage = 0;
      const totalPages = Math.ceil(signals.length / pageSize);

      const generateEmbed = (page) => {
        const start = page * pageSize;
        const end = start + pageSize;
        const pageSignals = signals.slice(start, end);

        const embed = {
          title: 'Signal List',
          fields: pageSignals.map(signal => ({
            name: `Signal ${signal._id}`,
            value: `Author: ${signal.author}\nSL: ${signal.sl}\nTP1: ${signal.tp1}\nROI: ${signal.roi || 'N/A'}\nDate: ${new Date(signal.createdAt).toLocaleDateString()}`,
            inline: false
          })),
          footer: { text: `Page ${page + 1} of ${totalPages}` }
        };
        return embed;
      };

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('prev_page')
            .setLabel('Previous')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(currentPage === 0),
          new ButtonBuilder()
            .setCustomId('next_page')
            .setLabel('Next')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(currentPage === totalPages - 1)
        );

      const message = await interaction.reply({ embeds: [generateEmbed(currentPage)], components: [row], fetchReply: true });

      const filter = (i) => i.user.id === interaction.user.id;
      const collector = message.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async (i) => {
        if (i.customId === 'prev_page' && currentPage > 0) {
          currentPage--;
        } else if (i.customId === 'next_page' && currentPage < totalPages - 1) {
          currentPage++;
        }

        const newRow = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('prev_page')
              .setLabel('Previous')
              .setStyle(ButtonStyle.Primary)
              .setDisabled(currentPage === 0),
            new ButtonBuilder()
              .setCustomId('next_page')
              .setLabel('Next')
              .setStyle(ButtonStyle.Primary)
              .setDisabled(currentPage === totalPages - 1)
          );

        await i.update({ embeds: [generateEmbed(currentPage)], components: [newRow] });
      });

      collector.on('end', () => {
        interaction.editReply({ components: [] });
      });
    } catch (error) {
      await interaction.reply('Error fetching signals.');
    }
  },
};