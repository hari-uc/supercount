import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../interfaces/slashCommand";

export default new SlashCommand({
  builder: new SlashCommandBuilder().setName("ping1").setDescription("Ping!"),
  run: async ({ interaction }) => {
    console.log("ping1 command executed");
    interaction.reply("Pong!!");
  }
});
