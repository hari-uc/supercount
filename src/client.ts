import { Client, Collection } from "discord.js";
import { Command, Event } from "./interfaces";
import { config } from "./config/bot.config";
import { readdirSync } from "fs";
import path from "path";
class ExtendedClient extends Client {
        public commands: Collection<string, Command> = new Collection();
        public events: Collection<string, Event> = new Collection();
        public aliases: Collection<string, Command> = new Collection();
        public config = config;

        public async init() {
                this.login(this.config.bot.token);
                
                /* Commands */
                const commandPath = path.join(__dirname, "commands");
                readdirSync(commandPath).forEach(dir => {
                        const commands = readdirSync(`${commandPath}/${dir}`).filter(file => file.endsWith(".ts"));
                        for (const file of commands) {
                                const { command } = require(`${commandPath}/${dir}/${file}`);
                                this.commands.set(command.name, command);
                                if (command.aliases) {
                                        command.aliases.forEach((alias: string) => {
                                                this.aliases.set(alias, command);
                                        });
                                }
                        }
                });

                /* Events */
                const eventPath = path.join(__dirname, "events");
                readdirSync(eventPath).forEach(dir => {
                        const events = readdirSync(`${eventPath}/${dir}`).filter(file => file.endsWith(".ts"));
                        for (const file of events) {
                                const { event } = require(`${eventPath}/${dir}/${file}`);
                                this.events.set(event.name, event);
                                this.on(event.name, event.run.bind(null, this));
                        }
                });
        }
}

export default ExtendedClient;
