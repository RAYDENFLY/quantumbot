import axios from 'axios';

export default {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'signal_modal') {
        const author = interaction.fields.getTextInputValue('author');
        const conviction = interaction.fields.getTextInputValue('conviction');
        const reason = interaction.fields.getTextInputValue('reason');
        const sl = interaction.fields.getTextInputValue('sl');
        const tp1 = interaction.fields.getTextInputValue('tp1');
        const tp2 = interaction.fields.getTextInputValue('tp2');
        const tp3 = interaction.fields.getTextInputValue('tp3');

        const channel = interaction.guild.channels.cache.get('1448267574293954601');
        if (!channel) {
          const embed = {
            title: 'Error',
            description: 'Review channel not found.',
            color: 0xff0000,
          };
          return interaction.reply({ embeds: [embed], ephemeral: true });
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
              .setCustomId(`accept_signal_${interaction.id}`)
              .setLabel('Accept')
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId(`decline_signal_${interaction.id}`)
              .setLabel('Decline')
              .setStyle(ButtonStyle.Danger)
          );

        await channel.send({ embeds: [embed], components: [row] });

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
            messageId: interaction.id
          });
        } catch (error) {
          console.error('Error saving signal to database:', error);
        }

        await interaction.reply({ embeds: [{ title: 'Success', description: 'Signal submitted for review.', color: 0x00ff00 }], ephemeral: true });
      } else if (interaction.customId === 'research_modal') {
        const link = interaction.fields.getTextInputValue('link');
        const author = interaction.fields.getTextInputValue('author');

        const channel = interaction.guild.channels.cache.get('1448267574293954601');
        if (!channel) {
          const embed = {
            title: 'Error',
            description: 'Review channel not found.',
            color: 0xff0000,
          };
          return interaction.reply({ embeds: [embed], ephemeral: true });
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
              .setCustomId(`accept_research_${interaction.id}`)
              .setLabel('Accept')
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId(`decline_research_${interaction.id}`)
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
            messageId: interaction.id
          });
        } catch (error) {
          console.error('Error saving research to database:', error);
        }

        await interaction.reply({ embeds: [{ title: 'Success', description: 'Research submitted for review.', color: 0x00ff00 }], ephemeral: true });
      } else if (interaction.customId === 'learning_modal') {
        const link = interaction.fields.getTextInputValue('link');
        const author = interaction.fields.getTextInputValue('author');
        const deskripsi = interaction.fields.getTextInputValue('deskripsi');

        const channel = interaction.guild.channels.cache.get('1448267574293954601');
        if (!channel) {
          const embed = {
            title: 'Error',
            description: 'Review channel not found.',
            color: 0xff0000,
          };
          return interaction.reply({ embeds: [embed], ephemeral: true });
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
              .setCustomId(`accept_learning_${interaction.id}`)
              .setLabel('Accept')
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId(`decline_learning_${interaction.id}`)
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
            messageId: interaction.id
          });
        } catch (error) {
          console.error('Error saving learning to database:', error);
        }

        await interaction.reply({ embeds: [{ title: 'Success', description: 'Learning submitted for review.', color: 0x00ff00 }], ephemeral: true });
      } else if (interaction.customId === 'academy_modal') {
        const link = interaction.fields.getTextInputValue('link');
        const author = interaction.fields.getTextInputValue('author');
        const deskripsi = interaction.fields.getTextInputValue('deskripsi');
        const ratings = parseInt(interaction.fields.getTextInputValue('ratings'));

        const channel = interaction.guild.channels.cache.get('1448267574293954601');
        if (!channel) {
          const embed = {
            title: 'Error',
            description: 'Review channel not found.',
            color: 0xff0000,
          };
          return interaction.reply({ embeds: [embed], ephemeral: true });
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
              .setCustomId(`accept_academy_${interaction.id}`)
              .setLabel('Accept')
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId(`decline_academy_${interaction.id}`)
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
            messageId: interaction.id
          });
        } catch (error) {
          console.error('Error saving academy to database:', error);
        }

        await interaction.reply({ embeds: [{ title: 'Success', description: 'Academy submitted for review.', color: 0x00ff00 }], ephemeral: true });
      }
    } else if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ embeds: [{ title: 'Error', description: 'There was an error while executing this command!', color: 0xff0000 }], ephemeral: true });
        } else {
          await interaction.reply({ embeds: [{ title: 'Error', description: 'There was an error while executing this command!', color: 0xff0000 }], ephemeral: true });
        }
      }
    }
  },
};