import ExtendedClient from "./client";
import { Partials, GatewayIntentBits } from "discord.js";

const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  partials: [Partials.Message]
});

client.init();
