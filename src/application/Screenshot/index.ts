import { Request, Response } from "express";
import puppeteer from "puppeteer";
import { size, timeout } from "../../global";

const takeShot = async (domain: string, path: string) => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        defaultViewport: {
            width: size.width,
            height: size.height,
        },
        ignoreHTTPSErrors: true,
        timeout: timeout,
    });
    const page = await browser.newPage();
    await page.goto(`http://${domain}${path}`, {
        waitUntil: "networkidle2",
        timeout: timeout,
    });

    const buffer = await page.screenshot({
        encoding: "binary",
        type: "png",
    });

    await browser.close();

    return buffer;
};

const Screenshot = (req: Request, res: Response) => {
    const parsed = req.url.split("/");
    const domain = parsed[1];
    const path = req.originalUrl.slice(req.url.indexOf(domain) + domain.length);

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

export default Screenshot;
