import { Interaction } from "discord.js";
import { handleCommand } from "../utils/handlers";
import { ExtendedClient } from "../client";
import { Event } from "../interfaces";

export const event: Event = {
  name: "interactionCreate",
  run: async (client: ExtendedClient, interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    handleCommand(interaction, client);
  }
};
