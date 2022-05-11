# Website Screenshot
Take screenshot for websites

This project can be deployed as Docker, or on SaaS service.

## How to use

### Use an existing service

You can go <https://screenshot.ahdark.com> to use the already deployed service, which provides a global accelerated CDN and an excellent caching mechanism, and adds more optimizations to the original code to make images load faster.

### Configure

The project provides several customizable environment variables.

| Environment variable | Introduction      | Format            | Default    |
|----------------------|-------------------|-------------------|------------|
| PORT                 | Web service port  | string            | 3000       |
| ALLOWDOMAINS         | Whitelist domains | Array<string>     | []         |
| TIMEOUT              | Request timeout   | number            | 10000 (ms) |
| SIZE                 | Screenshot size   | [number]x[number] | 1920x1080  |

### Run with command

```bash
cd frontend
yarn install
yarn build
cd ..
yarn install
yarn build
yarn start
# Next the service will listen on port 3000
```

### Run with Docker

```bash
docker pull ghcr.io/ah-dark/website-screenshot:latest
ducker run -itd --name website-screenshot -p 3000:3000 ghcr.io/ah-dark/website-screenshot:latest
# Next the service will listen on port 3000
```

### Run with Tencent Cloud SCF (云函数)

#### Build on TCR

1. Fork this repository into your GitHub account.
2. Goto <https://console.cloud.tencent.com/tcr>.
3. Choose an area and add a repository.
4. View _Image Build_ and configure the auto-build depends on your forked GitHub repository.
5. Click _Build Now_ and wait for the build process to complete.

#### Create function on SCF

1. Goto <https://console.cloud.tencent.com/scf/>.
2. Select the area which same as your image repository area.
3. Generate a Web Function, use container mode, select the image you just packaged.
4. Increase the memory cap to 1.5GB or 2GB.
5. Increase the timeout to 20 seconds.
6. Add an environment variable `PORT` and set the value to `9000`.
7. Finished.
8. Next, go to the trigger page to get the link, and then call it as much as you like.
