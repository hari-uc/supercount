import { Event, Command } from "../interfaces";
import { Message } from "discord.js";

const event: Event = {
  name: "messageCreate",
  run: (client, message: Message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX || "!")) return;

    const args = message.content
      .slice(process.env.PREFIX?.length)
      .trim()
      .split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        cmd => cmd.aliases && cmd.aliases.includes(commandName)
      );
    if (!command) return;

    try {
      command.run(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error trying to execute that command!");
    }
  }
};
