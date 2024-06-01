import { PermissionResolvable, SlashCommandBuilder, CommandInteraction, SlashCommandOptionsOnlyBuilder } from "discord.js";
import { ExtendedClient } from "../client";

export type CommandArgs = {
  client: ExtendedClient;
  interaction: CommandInteraction;
};

export class SlashCommand {
  disabled?: boolean;
  permissions?: PermissionResolvable[];
  onlyDev?: boolean;
  builder: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run: (args: CommandArgs) => any;

  /**
   * Creates a new command
   * @param options Command options
   */
  constructor(options: NonNullable<SlashCommand>) {
    Object.assign(this, options);
  }
}
