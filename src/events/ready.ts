import { Event } from "../interfaces";

export const event: Event = {
  name: "ready",
  run: client => {
    console.log(`Logged in as ${client.user.tag}`);
  }
};