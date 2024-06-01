import { prefixCommand } from "../../interfaces/prefixCommand";

export const command: prefixCommand = {
  name: "ping",
  description: "Ping!",
  aliases: ["p"],
  run: (client, message, args) => {
    message.channel.send("Pong!");
  }
};
