import express from "express";
import cors from "cors";
import logger from "morgan";
import { port } from "./global";
import Screenshot from "./application/Screenshot";

const app = express();

app.use("/", express.static("./frontend/build/"));
app.use("/static/", express.static("./frontend/build/"));

app.use(
    cors((req, callback) => {
        callback(null, {
            credentials: true,
            origin: true,
            maxAge: 3600,
            allowedHeaders: ["Authorized", "Content-Type"],
            exposedHeaders: "*",
        });
    })
);
app.use(logger("combined"));
app.use((req, res, next) => {
    res.setHeader("X-Powered-By", "github.com/ah-dark/website-screenshot");
    next();
});

app.use(Screenshot);

app.listen(port, () => {
    console.log("[Express]", "App listening on port " + port);
});
