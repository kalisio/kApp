## Use a builder
##

FROM node:16-bookworm-slim as Builder
LABEL maintainer="contact@kalisio.xyz"

COPY . /opt/kalisio

# Setup ENV
ARG APP
ARG NODE_APP_INSTANCE
ARG SUBDOMAIN
ARG HEADLESS

ENV APP=$APP
ENV NODE_APP_INSTANCE=$NODE_APP_INSTANCE
ENV SUBDOMAIN=$SUBDOMAIN
ENV HEADLESS=$HEADLESS

# Test environment configuration
WORKDIR /opt/kalisio/
RUN ls /opt/kalisio/
RUN \
  cd /opt/kalisio/kdk && yarn && yarn link --link-folder /opt/kalisio/yarn-links && \
  cd /opt/kalisio/$APP && yarn && yarn link "@kalisio/kdk" --link-folder /opt/kalisio/yarn-links

## Copy to final container
##

FROM node:16-bookworm-slim
LABEL maintainer="contact@kalisio.xyz"

ENV APP=$APP
ENV NODE_APP_INSTANCE=$NODE_APP_INSTANCE
ENV SUBDOMAIN=$SUBDOMAIN
ENV HEADLESS=$HEADLESS

# Setup Puppeteer
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker
RUN export DEBIAN_FRONTEND=noninteractive \
  && apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y \
    google-chrome-stable \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    libxss1  \
    xorg \
    xserver-xorg \
    xvfb \
    libx11-dev \
    libxext-dev \
    --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Copy Puppeteer cache from builder
COPY --from=Builder --chown=node:node /root/.cache/puppeteer /home/node/.cache/puppeteer

# Copy from builder
COPY --from=Builder --chown=node:node /opt/kalisio /opt/kalisio

# From now on, run stuff as 'node'
USER node

# Run tests
WORKDIR /opt/kalisio/$APP
CMD [ "yarn", "test:client" ]