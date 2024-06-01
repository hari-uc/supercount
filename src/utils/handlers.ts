import { CommandInteraction } from "discord.js";
import { ExtendedClient } from "../client";
import { SlashCommand } from "../interfaces";

export async function handleCommand(
  interaction: CommandInteraction,
  client: ExtendedClient
) {
  const command = client.commands.get(interaction.commandName) as SlashCommand;

  if (!command) return;

  try {
    command.run({ client, interaction });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true
    });
  }
}
