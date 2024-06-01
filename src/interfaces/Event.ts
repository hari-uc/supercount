import {ExtendedClient} from "../client";
import { ClientEvents } from "discord.js";

export interface Run {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (client: ExtendedClient, ...args: any[]): void;
}

export interface Event {
  name: keyof ClientEvents;
  run: Run;
}