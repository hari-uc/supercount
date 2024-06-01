/* eslint-disable arrow-parens */
import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../interfaces";
import * as chrono from "chrono-node";

export default new SlashCommand({
  builder: new SlashCommandBuilder()
    .setName("add-countdown")
    .setDescription("Add a new countdown event")
    .addStringOption((option) =>
      option
        .setName("event-name")
        .setDescription("Name of the event")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("event-date")
        .setDescription(
          "Date of the event in any casual date format or in natural language"
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("alert-frequency")
        .setDescription("Frequency of the alert in days")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("alert-time")
        .setDescription("Time to send the alert")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("timezone")
        .setDescription("Timezone of the event to send the alert")
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName("roles")
        .setDescription("Roles to mention when alert is sent")
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName("alert-channels")
        .setDescription("Channels to send the alert")
        .setRequired(false)
    ),

  run: async ({ interaction }) => {
    await interaction.deferReply();
    const eventName = interaction.options.get("event-name").value;
    const eventDate = interaction.options.get("event-date").value as string;
    const alertFrequency = interaction.options.get("alert-frequency")?.value;
    const alertTime = interaction.options.get("alert-time")?.value;
    const timezone = interaction.options.get("timezone")?.value;
    const roles = interaction.options.get("roles")?.value;
    const channels = interaction.options.get("alert-channels")?.value;

    console.log({
      eventName,
      eventDate,
      alertFrequency,
      alertTime,
      timezone,
      roles,
      channels
    });

    const date = chrono.parseDate(eventDate);
    console.log({ date });
    if (!date) {
      return interaction.editReply("Invalid date format");
    }
    const currentDate = new Date();

    if (date < currentDate) {
      return interaction.editReply("The event must be in the future");
    }

    // if timezone is provided, validate it

    // const eventName = interaction.options.getString("event-name");
    interaction.editReply(`Event name: ${eventName}`);
  }
});
