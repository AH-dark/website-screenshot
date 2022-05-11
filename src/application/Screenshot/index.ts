import express, { Request, Response } from "express";
import puppeteer from "puppeteer";
import { size, timeout } from "../../global";

const takeShot = async (domain: string, path: string) => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
        defaultViewport: {
            width: size.width,
            height: size.height,
        },
        ignoreHTTPSErrors: true,
        timeout: timeout,
        headless: "chrome",
    });
    const page = await browser.newPage();
    await page.goto(`http://${domain}${path}`, {
        waitUntil: "networkidle2",
        timeout: timeout,
    });

    const buffer = await page.screenshot({
        encoding: "binary",
        type: "webp",
    });

    await browser.close();

    return buffer;
};

const Screenshot = (req: Request, res: Response) => {
    const parsed = req.url.split("/");
    const domain = parsed[1];
    let path = req.url.slice(req.url.indexOf(domain) + domain.length);
    if (path.endsWith("/index.html")) {
        path = path.slice(0, path.length - "/index.html".length);
    }

    console.log("[Screenshot]", "Prepared to get screenshot:", `http://${domain}${path}`);

    takeShot(domain, path)
        .then((data) => {
            console.log("[Screenshot]", "Get screenshot success:", `http://${domain}${path}`);
            res.contentType("image/webp");
            res.send(data);
            res.end();
        })
        .catch((err) => {
            console.error("[Screenshot]", err);
            res.sendStatus(500);
            res.end();
        });
};

const router = express.Router();

router.all(RegExp("^/\\w[-a-zA-Z\\d]{0,62}(\\.[a-zA-Z\\d][-a-zA-Z\\d]{0,62})+\\.?/?"), Screenshot);

export default router;
