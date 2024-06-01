/* eslint-disable arrow-parens */
import { ExtendedClient } from "../client";
import { Event, prefixCommand } from "../interfaces";
import { Message } from "discord.js";

export const event: Event = {
  name: "messageCreate",
  run: (client: ExtendedClient, message: Message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith("!")) return;

    const args = message.content.slice("!".length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    const command =
      (client.commands.get(commandName) as prefixCommand) ||
      (client.commands.find((cmd: prefixCommand) =>
        cmd.aliases?.includes(commandName)
      ) as prefixCommand);
    if (!command) return;

    try {
      command.run(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error trying to execute that command!");
    }
  }
};
