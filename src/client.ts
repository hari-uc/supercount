import { Client, Collection, Partials, GatewayIntentBits } from "discord.js";
import { prefixCommand, SlashCommand, Event } from "./interfaces";
import { config } from "./config/bot.config";
import { readdirSync } from "fs";
import path from "path";

export class ExtendedClient extends Client {
  public commands: Collection<string, prefixCommand | SlashCommand> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public aliases: Collection<string, prefixCommand> = new Collection();
  public config = config;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ],
      partials: [Partials.Message]
    });
  }

  public async init() {
    this.once("ready", async () => {
      console.log(`Logged in as ${this.user?.tag}!`);

      /* Commands */
      const commandPath = path.join(__dirname, "commands");

      const slashCommands = readdirSync(`${commandPath}/slashCommands`).filter(file =>
        file.endsWith(".ts")
      );

      for (const file of slashCommands) {
        const command = require(`${commandPath}/slashCommands/${file}`);
        this.commands.set(command.default.builder.name, command.default);
      }

      const prefixCommands = readdirSync(`${commandPath}/prefixCommands`).filter(file =>
        file.endsWith(".ts")
      );

      for (const file of prefixCommands) {
        const { command } = require(`${commandPath}/prefixCommands/${file}`);
        this.commands.set(command.name, command);
        if (command.aliases) {
          command.aliases.forEach((alias: string) => {
            this.aliases.set(alias, command);
          });
        }
      }

      // Deploy slash commands
      const commands = this.commands.filter(cmd => cmd instanceof SlashCommand) as Collection<string, SlashCommand>;
      await this.application?.commands.set(commands.map(cmd => cmd.builder.toJSON()));

      /* Events */
      const eventPath = path.join(__dirname, "events");
      const events = readdirSync(`${eventPath}`).filter(file =>
        file.endsWith(".ts")
      );
      for (const file of events) {
        const { event } = require(`${eventPath}/${file}`);
        this.events.set(event.name, event);
        this.on(event.name, event.run.bind(null, this));
      }
    });

    await this.login(this.config.bot.token);
  }


}
