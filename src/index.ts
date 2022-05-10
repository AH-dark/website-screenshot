import express from "express";
import { port } from "./global";
import Screenshot from "./application/Screenshot";

const app = express();

app.use(Screenshot);

app.listen(port, () => {
    console.log("[Express]", "App listening on port " + port);
});
