import axios from 'axios';

export default {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const [action, type, messageId] = interaction.customId.split('_');

    if (action === 'accept' && type === 'signal') {
      // Save to database via API
      try {
        // Extract data from embed
        const embed = interaction.message.embeds[0];
        const fields = embed.fields;
        const data = {
          author: fields.find(f => f.name === 'Author')?.value,
          conviction: fields.find(f => f.name === 'Conviction')?.value,
          reason: fields.find(f => f.name === 'Reason')?.value,
          sl: fields.find(f => f.name === 'SL')?.value,
          tp1: fields.find(f => f.name === 'TP1')?.value,
          tp2: fields.find(f => f.name === 'TP2')?.value,
          tp3: fields.find(f => f.name === 'TP3')?.value,
          messageId,
          status: 'approved'
        };
        await axios.post(`${process.env.API_BASE_URL}/api/signals`, data);
        await interaction.update({ embeds: [{ title: 'Accepted', description: 'Signal accepted and saved!', color: 0x00ff00 }], components: [] });
      } catch (error) {
        await interaction.update({ embeds: [{ title: 'Error', description: 'Error saving signal.', color: 0xff0000 }], components: [] });
      }
    } else if (action === 'decline' && type === 'signal') {
      await interaction.update({ embeds: [{ title: 'Declined', description: 'Signal declined.', color: 0xff0000 }], components: [] });
    } else if (action === 'accept' && type === 'research') {
      try {
        const embed = interaction.message.embeds[0];
        const fields = embed.fields;
        const data = {
          link: fields.find(f => f.name === 'Link')?.value,
          author: fields.find(f => f.name === 'Author')?.value,
          messageId,
          status: 'approved'
        };
        await axios.post(`${process.env.API_BASE_URL}/api/research`, data);
        await interaction.update({ embeds: [{ title: 'Accepted', description: 'Research accepted and saved!', color: 0x00ff00 }], components: [] });
      } catch (error) {
        await interaction.update({ embeds: [{ title: 'Error', description: 'Error saving research.', color: 0xff0000 }], components: [] });
      }
    } else if (action === 'decline' && type === 'research') {
      await interaction.update({ embeds: [{ title: 'Declined', description: 'Research declined.', color: 0xff0000 }], components: [] });
    } else if (action === 'accept' && type === 'learning') {
      try {
        const embed = interaction.message.embeds[0];
        const fields = embed.fields;
        const data = {
          link: fields.find(f => f.name === 'Link')?.value,
          author: fields.find(f => f.name === 'Author')?.value,
          messageId,
          status: 'approved'
        };
        await axios.post(`${process.env.API_BASE_URL}/api/learning`, data);
        await interaction.update({ embeds: [{ title: 'Accepted', description: 'Learning accepted and saved!', color: 0x00ff00 }], components: [] });
      } catch (error) {
        await interaction.update({ embeds: [{ title: 'Error', description: 'Error saving learning.', color: 0xff0000 }], components: [] });
      }
    } else if (action === 'decline' && type === 'learning') {
      await interaction.update({ embeds: [{ title: 'Declined', description: 'Learning declined.', color: 0xff0000 }], components: [] });
    } else if (action === 'accept' && type === 'academy') {
      try {
        const embed = interaction.message.embeds[0];
        const fields = embed.fields;
        const data = {
          link: fields.find(f => f.name === 'Link')?.value,
          author: fields.find(f => f.name === 'Author')?.value,
          messageId,
          status: 'approved'
        };
        await axios.post(`${process.env.API_BASE_URL}/api/academy`, data);
        await interaction.update({ embeds: [{ title: 'Accepted', description: 'Academy accepted and saved!', color: 0x00ff00 }], components: [] });
      } catch (error) {
        await interaction.update({ embeds: [{ title: 'Error', description: 'Error saving academy.', color: 0xff0000 }], components: [] });
      }
    } else if (action === 'decline' && type === 'academy') {
      await interaction.update({ embeds: [{ title: 'Declined', description: 'Academy declined.', color: 0xff0000 }], components: [] });
    }
  },
};