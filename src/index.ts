import express from "express";
import { port } from "./global";
import Screenshot from "./application/Screenshot";

const app = express();

app.all(
    RegExp("^/[a-zA-Z\\d][-a-zA-Z\\d]{0,62}(\\.[a-zA-Z\\d][-a-zA-Z\\d]{0,62})+\\.?/"),
    Screenshot
);

app.listen(port, () => {
    console.log("[Express]", "App listening on port " + port);
});
