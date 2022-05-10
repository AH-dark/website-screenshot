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

RUN apt update && \
    apt upgrade && \
    apt install --update ca-certificates && \
    apt install chromium nss freetype harfbuzz ca-certificates

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

ENTRYPOINT node build/index.js
