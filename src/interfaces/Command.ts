import Client from "../client";
import { Message } from "discord.js";

export interface Run {
  (client: Client, message: Message, args: string[]): void;
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  run: Run;
}
