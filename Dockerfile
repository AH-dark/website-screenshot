FROM node:16-alpine AS frontend

COPY frontend .
RUN yarn install
RUN yarn build

FROM node:16-alpine AS deps

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

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

FROM node:16-alpine AS runner

# Installs latest Chromium (100) package.
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tencent.com/g' /etc/apk/repositories
RUN apk update && apk upgrade
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      font-adobe-100dpi

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN mkdir /usr/share/fonts/win
COPY fonts /usr/share/fonts/win
RUN fc-cache -f && \
    fc-list

COPY --from=builder build build
COPY --from=deps node_modules node_modules
COPY --from=deps package.json package.json
COPY --from=deps yarn.lock yarn.lock
COPY --from=frontend build frontend/build

RUN yarn install --production
RUN yarn add puppeteer@13.7.0

ENTRYPOINT node build/index.js
