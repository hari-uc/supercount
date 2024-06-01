import {ExtendedClient} from "../client";
import { Message } from "discord.js";

export interface Run {
  (client: ExtendedClient, message: Message, args?: string[]): void;
}

export interface prefixCommand {

  name: string;
  description: string;
  aliases?: string[];
  run: Run;
}
