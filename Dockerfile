FROM node:16-alpine AS frontend

COPY frontend .
RUN yarn install
RUN yarn build

FROM node:16-alpine AS deps

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

FROM node:16-alpine AS builder

COPY src src
COPY tsconfig.json tsconfig.json
COPY --from=deps node_modules node_modules
COPY --from=deps package.json package.json
COPY --from=deps yarn.lock yarn.lock

RUN yarn build

FROM node:16 AS runner

COPY --from=builder build build
COPY --from=deps node_modules node_modules
COPY --from=deps package.json package.json
COPY --from=deps yarn.lock yarn.lock
COPY --from=frontend build frontend/build

RUN yarn install --production

RUN apt update -y && \
    apt upgrade -y

RUN apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

ENTRYPOINT node build/index.js
