import { ExtendedClient } from "./client";
import { AppDataSource } from "./data-source";

const client = new ExtendedClient();

client.init();

AppDataSource.initialize().then(() => {
        console.log("Database initialized");
})
.catch(error => {
        console.error("Error initializing database", error);
});

