import { Command } from "../interfaces";

export const command: Command = {
  name: "ping",
  description: "Ping!",
  aliases: ["p"],
  run: (client, message, args) => {
    message.channel.send("Pong!");
  }
};
