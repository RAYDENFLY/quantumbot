import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import axios from 'axios';

export default {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    const prefix = 'q!';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'signal') {
      // q!signal <author> <conviction> <reason> <sl> <tp1> [tp2] [tp3]
      const [author, conviction, reason, sl, tp1, tp2, tp3] = args;
      if (!author || !conviction || !reason || !sl || !tp1) {
        const embed = {
          title: 'Error',
          description: 'Usage: q!signal <author> <conviction> <reason> <sl> <tp1> [tp2] [tp3]',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }

      const channel = message.guild.channels.cache.get('1448267574293954601');
      if (!channel) {
        const embed = {
          title: 'Error',
          description: 'Review channel not found.',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }

      const embed = {
        title: 'Trading Signal',
        fields: [
          { name: 'Author', value: author, inline: true },
          { name: 'Conviction', value: conviction, inline: true },
          { name: 'Reason', value: reason, inline: false },
          { name: 'SL', value: sl, inline: true },
          { name: 'TP1', value: tp1, inline: true },
          ...(tp2 ? [{ name: 'TP2', value: tp2, inline: true }] : []),
          ...(tp3 ? [{ name: 'TP3', value: tp3, inline: true }] : []),
          { name: 'Date', value: new Date().toISOString().split('T')[0], inline: false },
        ],
      };

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`accept_signal_${message.id}`)
            .setLabel('Accept')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(`decline_signal_${message.id}`)
            .setLabel('Decline')
            .setStyle(ButtonStyle.Danger)
        );

      await channel.send({ embeds: [embed], components: [row] });

      // Tag roles
      const roles = ['1371341008838721587', '1383313862455201842', '1448289932006264982', '1383312723823169546'];
      const roleMentions = roles.map(id => `<@&${id}>`).join(' ');
      await channel.send(`${roleMentions} New signal submitted!`);

      try {
        await axios.post(`${process.env.API_BASE_URL}/api/signals`, {
          author,
          conviction,
          reason,
          sl,
          tp1,
          tp2,
          tp3,
          messageId: message.id
        });
      } catch (error) {
        console.error('Error saving signal to database:', error);
      }

      const successEmbed = {
        title: 'Success',
        description: 'Signal submitted for review.',
        color: 0x00ff00,
      };
      message.reply({ embeds: [successEmbed] });
    } else if (command === 'research') {
      const [link, author] = args;
      if (!link || !author) {
        const embed = {
          title: 'Error',
          description: 'Usage: q!research <link> <author>',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }

      const channel = message.guild.channels.cache.get('1448267574293954601');
      if (!channel) {
        const embed = {
          title: 'Error',
          description: 'Review channel not found.',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }

      const embed = {
        title: 'Research Submission',
        fields: [
          { name: 'Link', value: link, inline: false },
          { name: 'Author', value: author, inline: true },
          { name: 'Date', value: new Date().toISOString().split('T')[0], inline: false },
        ],
      };

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`accept_research_${message.id}`)
            .setLabel('Accept')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(`decline_research_${message.id}`)
            .setLabel('Decline')
            .setStyle(ButtonStyle.Danger)
        );

      await channel.send({ embeds: [embed], components: [row] });

      const roles = ['1371341008838721587', '1383313862455201842', '1448289932006264982', '1383312723823169546'];
      const roleMentions = roles.map(id => `<@&${id}>`).join(' ');
      await channel.send(`${roleMentions} New research submitted!`);

      try {
        await axios.post(`${process.env.API_BASE_URL}/api/research`, {
          link,
          author,
          messageId: message.id
        });
      } catch (error) {
        console.error('Error saving research to database:', error);
      }

      const successEmbed = {
        title: 'Success',
        description: 'Research submitted for review.',
        color: 0x00ff00,
      };
      message.reply({ embeds: [successEmbed] });
    } else if (command === 'learning') {
      const [link, author, deskripsi] = args;
      if (!link || !author || !deskripsi) {
        const embed = {
          title: 'Error',
          description: 'Usage: q!learning <link> <author> <deskripsi>',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }

      const channel = message.guild.channels.cache.get('1448267574293954601');
      if (!channel) {
        const embed = {
          title: 'Error',
          description: 'Review channel not found.',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }

      const embed = {
        title: 'Learning Submission',
        fields: [
          { name: 'Link', value: link, inline: false },
          { name: 'Author', value: author, inline: true },
          { name: 'Deskripsi', value: deskripsi, inline: false },
          { name: 'Date', value: new Date().toISOString().split('T')[0], inline: false },
        ],
      };

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`accept_learning_${message.id}`)
            .setLabel('Accept')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(`decline_learning_${message.id}`)
            .setLabel('Decline')
            .setStyle(ButtonStyle.Danger)
        );

      await channel.send({ embeds: [embed], components: [row] });

      const roles = ['1371341008838721587', '1383313862455201842', '1448289932006264982', '1383312723823169546'];
      const roleMentions = roles.map(id => `<@&${id}>`).join(' ');
      await channel.send(`${roleMentions} New learning submitted!`);

      try {
        await axios.post(`${process.env.API_BASE_URL}/api/learning`, {
          link,
          author,
          deskripsi,
          messageId: message.id
        });
      } catch (error) {
        console.error('Error saving learning to database:', error);
      }

      const successEmbed = {
        title: 'Success',
        description: 'Learning submitted for review.',
        color: 0x00ff00,
      };
      message.reply({ embeds: [successEmbed] });
    } else if (command === 'academy') {
      const [link, author, deskripsi, ratingsStr] = args;
      const ratings = parseInt(ratingsStr);
      if (!link || !author || !deskripsi || isNaN(ratings)) {
        const embed = {
          title: 'Error',
          description: 'Usage: q!academy <link> <author> <deskripsi> <ratings>',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }

      const channel = message.guild.channels.cache.get('1448267574293954601');
      if (!channel) {
        const embed = {
          title: 'Error',
          description: 'Review channel not found.',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }

      const embed = {
        title: 'Academy Submission',
        fields: [
          { name: 'Link', value: link, inline: false },
          { name: 'Author', value: author, inline: true },
          { name: 'Deskripsi', value: deskripsi, inline: false },
          { name: 'Ratings', value: ratings.toString(), inline: true },
          { name: 'Date', value: new Date().toISOString().split('T')[0], inline: false },
        ],
      };

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`accept_academy_${message.id}`)
            .setLabel('Accept')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(`decline_academy_${message.id}`)
            .setLabel('Decline')
            .setStyle(ButtonStyle.Danger)
        );

      await channel.send({ embeds: [embed], components: [row] });

      const roles = ['1371341008838721587', '1383313862455201842', '1448289932006264982', '1383312723823169546'];
      const roleMentions = roles.map(id => `<@&${id}>`).join(' ');
      await channel.send(`${roleMentions} New academy submitted!`);

      try {
        await axios.post(`${process.env.API_BASE_URL}/api/academy`, {
          link,
          author,
          deskripsi,
          ratings,
          messageId: message.id
        });
      } catch (error) {
        console.error('Error saving academy to database:', error);
      }

      const successEmbed = {
        title: 'Success',
        description: 'Academy submitted for review.',
        color: 0x00ff00,
      };
      message.reply({ embeds: [successEmbed] });
    } else if (command === 'sl') {
      const adminRoles = ['1371341008838721587', '1383313862455201842', '1448289932006264982', '1383312723823169546'];
      if (!message.member.roles.cache.some(role => adminRoles.includes(role.id))) {
        const embed = {
          title: 'Error',
          description: 'You do not have permission to use this command.',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }
      const [signalId, roi] = args;
      if (!signalId || !roi) {
        const embed = {
          title: 'Error',
          description: 'Usage: q!sl <signal_id> <roi>',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }
      // Update signal status to closed, set roi
      try {
        await axios.patch(`${process.env.API_BASE_URL}/api/signals/${signalId}`, { status: 'closed', roi: parseFloat(roi) });
        const embed = {
          title: 'Success',
          description: `Signal ${signalId} marked as SL with ROI ${roi}.`,
          color: 0x00ff00,
        };
        message.reply({ embeds: [embed] });
      } catch (error) {
        const embed = {
          title: 'Error',
          description: 'Error updating signal.',
          color: 0xff0000,
        };
        message.reply({ embeds: [embed] });
      }
    } else if (command === 'tp1') {
      const adminRoles = ['1371341008838721587', '1383313862455201842', '1448289932006264982', '1383312723823169546'];
      if (!message.member.roles.cache.some(role => adminRoles.includes(role.id))) {
        const embed = {
          title: 'Error',
          description: 'You do not have permission to use this command.',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }
      const [signalId, roi] = args;
      if (!signalId || !roi) {
        const embed = {
          title: 'Error',
          description: 'Usage: q!tp1 <signal_id> <roi>',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }
      try {
        await axios.patch(`${process.env.API_BASE_URL}/api/signals/${signalId}`, { status: 'closed', roi: parseFloat(roi) });
        const embed = {
          title: 'Success',
          description: `Signal ${signalId} marked as TP1 with ROI ${roi}.`,
          color: 0x00ff00,
        };
        message.reply({ embeds: [embed] });
      } catch (error) {
        const embed = {
          title: 'Error',
          description: 'Error updating signal.',
          color: 0xff0000,
        };
        message.reply({ embeds: [embed] });
      }
    } else if (command === 'tp2') {
      const adminRoles = ['1371341008838721587', '1383313862455201842', '1448289932006264982', '1383312723823169546'];
      if (!message.member.roles.cache.some(role => adminRoles.includes(role.id))) {
        const embed = {
          title: 'Error',
          description: 'You do not have permission to use this command.',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }
      const [signalId, roi] = args;
      if (!signalId || !roi) {
        const embed = {
          title: 'Error',
          description: 'Usage: q!tp2 <signal_id> <roi>',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }
      try {
        await axios.patch(`${process.env.API_BASE_URL}/api/signals/${signalId}`, { status: 'closed', roi: parseFloat(roi) });
        const embed = {
          title: 'Success',
          description: `Signal ${signalId} marked as TP2 with ROI ${roi}.`,
          color: 0x00ff00,
        };
        message.reply({ embeds: [embed] });
      } catch (error) {
        const embed = {
          title: 'Error',
          description: 'Error updating signal.',
          color: 0xff0000,
        };
        message.reply({ embeds: [embed] });
      }
    } else if (command === 'tp3') {
      const adminRoles = ['1371341008838721587', '1383313862455201842', '1448289932006264982', '1383312723823169546'];
      if (!message.member.roles.cache.some(role => adminRoles.includes(role.id))) {
        const embed = {
          title: 'Error',
          description: 'You do not have permission to use this command.',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }
      const [signalId, roi] = args;
      if (!signalId || !roi) {
        const embed = {
          title: 'Error',
          description: 'Usage: q!tp3 <signal_id> <roi>',
          color: 0xff0000,
        };
        return message.reply({ embeds: [embed] });
      }
      try {
        await axios.patch(`${process.env.API_BASE_URL}/api/signals/${signalId}`, { status: 'closed', roi: parseFloat(roi) });
        const embed = {
          title: 'Success',
          description: `Signal ${signalId} marked as TP3 with ROI ${roi}.`,
          color: 0x00ff00,
        };
        message.reply({ embeds: [embed] });
      } catch (error) {
        const embed = {
          title: 'Error',
          description: 'Error updating signal.',
          color: 0xff0000,
        };
        message.reply({ embeds: [embed] });
      }
    } else if (command === 'monitor') {
      // q!monitor - Monitor posisi trading
      try {
        const response = await axios.get(`${process.env.API_BASE_URL}/api/signals`);
        const runningSignals = response.data.filter(s => s.status === 'running');
        let description = 'Running Positions:\n';
        runningSignals.forEach(signal => {
          description += `ID: ${signal._id}, Author: ${signal.author}, SL: ${signal.sl}, TP1: ${signal.tp1}\n`;
        });
        if (runningSignals.length === 0) description = 'No running positions.';
        const embed = {
          title: 'Position Monitor',
          description,
          color: 0x0099ff,
        };
        message.reply({ embeds: [embed] });
      } catch (error) {
        const embed = {
          title: 'Error',
          description: 'Error fetching positions.',
          color: 0xff0000,
        };
        message.reply({ embeds: [embed] });
      }
    }
  },
};